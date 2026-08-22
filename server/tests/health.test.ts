import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

process.env.NODE_ENV = "test";

vi.mock("../src/db/driver", async () => {
  return {
    createDriver: vi.fn(),
    getDriver: vi.fn(),
    verifyConnection: vi.fn(),
    closeDriver: vi.fn(),
  };
});

import { createApp } from "../src/app";
import * as driver from "../src/db/driver";

describe("GET /api/health", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 and status ok when CognoDB is reachable", async () => {
    vi.mocked(driver.verifyConnection).mockResolvedValue(true);
    const app = createApp();

    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok", database: "connected" });
  });

  it("returns 503 and status error when CognoDB is unreachable", async () => {
    vi.mocked(driver.verifyConnection).mockResolvedValue(false);
    const app = createApp();

    const res = await request(app).get("/api/health");

    expect(res.status).toBe(503);
    expect(res.body).toEqual({ status: "error", database: "unavailable" });
  });
});
