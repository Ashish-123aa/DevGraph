import { Request, Response } from "express";
import { verifyConnection } from "../db/driver";

export async function getHealth(req: Request, res: Response) {
  const connected = await verifyConnection();
  const status = connected ? 200 : 503;
  res.status(status).json({
    status: connected ? "ok" : "error",
    database: connected ? "connected" : "unavailable",
  });
}
