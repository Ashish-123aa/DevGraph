import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fakeSession } from "./testUtils";

process.env.NODE_ENV = "test";

vi.mock("../src/db/session", () => ({
  withSession: vi.fn(),
}));

import { createApp } from "../src/app";
import * as sessionModule from "../src/db/session";

describe("GET /api/search", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns matching nodes for a valid query", async () => {
    const rows = [
      { id: "n1", labels: ["Skill"], props: { name: "Java", category: "Programming Languages" } },
    ];
    vi.mocked(sessionModule.withSession).mockImplementation((work) => work(fakeSession(rows) as never));

    const app = createApp();
    const res = await request(app).get("/api/search").query({ q: "java" });

    expect(res.status).toBe(200);
    expect(res.body.results).toHaveLength(1);
    expect(res.body.results[0].props.name).toBe("Java");
  });

  it("rejects an empty search query with 400", async () => {
    const app = createApp();
    const res = await request(app).get("/api/search").query({ q: "" });

    expect(res.status).toBe(400);
  });
});
