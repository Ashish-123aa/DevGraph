import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

interface HttpError extends Error {
  status?: number;
}

/** Wraps an async route handler so rejected promises reach the error middleware. */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: `No route: ${req.method} ${req.path}` });
}

// Must have exactly 4 params for Express to recognize it as an error handler.
export function errorHandler(err: HttpError, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Invalid request.",
      details: err.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
    });
    return;
  }

  const status = err.status ?? 500;

  // Never leak stack traces, driver internals, or credential strings to the client.
  if (status >= 500) {
    console.error("Unexpected error:", err.message);
  }

  const message =
    status >= 500
      ? "Something went wrong on our end. Please try again shortly."
      : err.message || "Request could not be processed.";

  res.status(status).json({ error: message });
}
