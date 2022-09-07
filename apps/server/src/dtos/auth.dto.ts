import { z } from "zod";
import type { ValidatorSchema } from "../middlewares/validator";

export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(6),
});

export type LoginBody = z.infer<typeof loginBodySchema>;

export const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const loginSchema: ValidatorSchema = {
  body: loginBodySchema,
};
