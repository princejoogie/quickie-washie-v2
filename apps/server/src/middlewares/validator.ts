import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error";
import { type ZodSchema, ZodError } from "zod";

export interface ValidatorSchema {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}

const validator = (schema: ValidatorSchema) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      if (schema.body != null) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.params != null) {
        req.params = await schema.params.parseAsync(req.params);
      }
      if (schema.query != null) {
        req.query = await schema.query.parseAsync(req.query);
      }

      return next();
    } catch (e) {
      console.log("VALIDATION ERROR", e);
      if (e instanceof ZodError) {
        let newErr: string = "";

        Object.entries(e.flatten().fieldErrors).forEach(([k, errs]) => {
          if (errs && !newErr) {
            newErr = `${k}: ${errs.join(", ")}`;
          }
        });

        const error = new AppError("BadRequestException", newErr);
        return next(error);
      }

      const error = new AppError("BadRequestException", (e as any).message);
      return next(error);
    }
  };
};
export default validator;
