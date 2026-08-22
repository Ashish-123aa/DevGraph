import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fakeSession } from "./testUtils";

process.env.NODE_ENV = "test";

vi.mock("../src/db/session", () => ({
  withSession: vi.fn(),
}));

import { createApp } from "../src/app";
import * as sessionModule from "../src/db/session";

describe("POST /api/projects/recommend", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("ranks projects by how many requested skills they demonstrate", async () => {
    const rows = [
      {
        id: "p1",
        props: { name: "Banking Application" },
        matchedSkills: ["Java", "SQL"],
        matchCount: 2,
      },
      {
        id: "p2",
        props: { name: "Payment Processing System" },
        matchedSkills: ["Java"],
        matchCount: 1,
      },
    ];
    vi.mocked(sessionModule.withSession).mockImplementation((work) =>
      work(fakeSession(rows) as never)
    );

    const app = createApp();
    const res = await request(app)
      .post("/api/projects/recommend")
      .send({ skills: ["Java", "SQL"] });

    expect(res.status).toBe(200);
    expect(res.body.projects).toHaveLength(2);
    expect(res.body.projects[0].matchCount).toBe(2);
  });

  it("requires at least one skill", async () => {
    const app = createApp();
    const res = await request(app).post("/api/projects/recommend").send({ skills: [] });

    expect(res.status).toBe(400);
  });
});
