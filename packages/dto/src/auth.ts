import { z } from "zod";
import type { User } from "@qw/db";
import type { ValidatorSchema } from "./common";

// LOGIN
export const loginBodySchema = z.object({
  email: z.string().email().trim(),
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

// REGISTER
export const registerBodySchema = z.object({
  email: z.string().email().trim(),
  password: z.string().trim().min(6),
  licenseUrl: z.string().url().trim(),
  name: z.string().trim(),
});

export type RegisterBody = z.infer<typeof registerBodySchema>;

export type RegisterResponse = {
  accessToken: string;
  user: User;
};

export const registerSchema: ValidatorSchema = {
  body: registerBodySchema,
};

export interface LogoutResponse {
  success: boolean;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
