import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

export interface ValidatorSchema {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}

const validator = (schema: ValidatorSchema) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.params) {
        req.body = await schema.params.parseAsync(req.body);
      }
      if (schema.query) {
        req.body = await schema.query.parseAsync(req.body);
      }

      return next();
    } catch (e) {
      return next(e);
    }
  };
};
export default validator;
