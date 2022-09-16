import type { ZodSchema } from "zod";

export interface ValidatorSchema {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}

