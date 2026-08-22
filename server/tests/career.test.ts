import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fakeSession } from "./testUtils";

process.env.NODE_ENV = "test";

vi.mock("../src/db/session", () => ({
  withSession: vi.fn(),
}));

import { createApp } from "../src/app";
import * as sessionModule from "../src/db/session";

describe("GET /api/career/path", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns ranked multi-hop paths from a skill to a job role", async () => {
    const pathRows = [
      {
        hops: 3,
        nodes: [
          { id: "s1", labels: ["Skill"], props: { name: "Java" } },
          { id: "t1", labels: ["Technology"], props: { name: "Spring Boot" } },
          { id: "r1", labels: ["JobRole"], props: { title: "Backend Engineer" } },
        ],
        relationships: [
          { id: "e1", type: "ENABLES" },
          { id: "e2", type: "COMMONLY_USED_IN" },
        ],
      },
    ];
    vi.mocked(sessionModule.withSession).mockImplementation((work) =>
      work(fakeSession(pathRows) as never)
    );

    const app = createApp();
    const res = await request(app)
      .get("/api/career/path")
      .query({ skill: "Java", role: "Backend Engineer" });

    expect(res.status).toBe(200);
    expect(res.body.paths).toHaveLength(1);
    expect(res.body.paths[0].hops).toBe(3);
  });

  it("requires both a skill and a role", async () => {
    const app = createApp();
    const res = await request(app).get("/api/career/path").query({ skill: "Java" });

    expect(res.status).toBe(400);
  });
});

describe("POST /api/career/skill-gap", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns missing skills ranked by priority", async () => {
    vi.mocked(sessionModule.withSession).mockImplementation((work) =>
      work(
        fakeSession((query: string) => {
          if (query.includes("RETURN r") && !query.includes("bridgeCount")) {
            // roleCheck
            return [{ r: { title: "Backend Engineer" } }];
          }
          if (query.includes("bridgeCount")) {
            // SKILL_GAP
            return [
              {
                id: "s2",
                props: { name: "Spring Boot", difficulty: "Intermediate" },
                bridgeCount: 1,
                bridgeDistance: 1,
              },
            ];
          }
          // SKILL_GAP_PREREQUISITES
          return [];
        }) as never
      )
    );

    const app = createApp();
    const res = await request(app)
      .post("/api/career/skill-gap")
      .send({ knownSkills: ["Java", "SQL", "Git"], targetRole: "Backend Engineer" });

    expect(res.status).toBe(200);
    expect(res.body.gaps).toHaveLength(1);
    expect(res.body.gaps[0].priority).toBe("high");
  });

  it("requires a target role", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/api/career/skill-gap")
      .send({ knownSkills: ["Java"], targetRole: "" });

    expect(res.status).toBe(400);
  });
});
