import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

/** Validates req.query against a schema and replaces req.query with the parsed (typed, coerced) result. */
export function validateQuery(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.query = schema.parse(req.query);
    next();
  };
}

/** Validates req.body against a schema and replaces req.body with the parsed result. */
export function validateBody(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);
    next();
  };
}
