import { z } from "zod";
import { Prisma, User } from "@qw/db";
import type { Prisma as PrismaType } from "@qw/db";
import type { ValidatorSchema } from "./common";

// LOGIN
export const loginBodySchema = z.object({
  email: z.string().email().trim(),
  password: z.string().trim().min(6),
});

export type LoginBody = z.infer<typeof loginBodySchema>;

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
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
  refreshToken: string;
  user: User;
};

export const registerSchema: ValidatorSchema = {
  body: registerBodySchema,
};

export interface LogoutResponse {
  success: boolean;
}

export const refreshTokenBodySchema = z.object({
  refreshToken: z.string(),
});

export type RefreshTokenBody = z.infer<typeof refreshTokenBodySchema>;

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const refreshTokenSchema: ValidatorSchema = {
  body: refreshTokenBodySchema,
};

// PROFILE

const profileResponse = Prisma.validator<PrismaType.UserArgs>()({
  select: {
    id: true,
    email: true,
    photoUrl: true,
    name: true,
    privilege: true,
  },
});

export type ProfileResponse = PrismaType.UserGetPayload<typeof profileResponse>;
