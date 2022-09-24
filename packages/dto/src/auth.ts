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

// UPDATE
export const updateProfileBodySchema = z.object({
  name: z.string().trim().optional(),
  imageUrl: z.string().url().optional(),
  licenseUrl: z.string().url().optional(),
  phone: z.string().min(13).max(13).trim().optional(),
});

export type UpdateProfileBody = z.infer<typeof updateProfileBodySchema>;

export const updateProfileResponseSchema =
  Prisma.validator<PrismaType.UserArgs>()({
    select: {
      id: true,
      email: true,
      photoUrl: true,
      phone: true,
      name: true,
      privilege: true,
      licenseUrl: true,
    },
  });

export type UpdateProfileResponse = PrismaType.UserGetPayload<
  typeof updateProfileResponseSchema
>;

export const updateProfileSchema: ValidatorSchema = {
  body: updateProfileBodySchema,
};

// REGISTER
export const registerBodySchema = z.object({
  email: z.string().email().trim(),
  password: z.string().trim().min(6),
  licenseUrl: z.string().url().trim(),
  phone: z.string().min(13).max(13).trim(),
  imageUrl: z.string().url().trim(),
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

export const profileResponse = Prisma.validator<PrismaType.UserArgs>()({
  select: {
    id: true,
    email: true,
    photoUrl: true,
    phone: true,
    name: true,
    privilege: true,
    licenseUrl: true,
  },
});

export type ProfileResponse = PrismaType.UserGetPayload<typeof profileResponse>;

// REAUTHENTICATE

export const reauthenticateBodySchema = z.object({
  password: z.string().trim().min(6),
});

export type ReauthenticateBody = z.infer<typeof reauthenticateBodySchema>;

export const reauthenticateSchema: ValidatorSchema = {
  body: reauthenticateBodySchema,
};

// CHANGE PASSWORD

export const changePasswordBodySchema = z.object({
  password: z.string().trim().min(6),
  newPassword: z.string().trim().min(6),
});

export type ChangePasswordBody = z.infer<typeof changePasswordBodySchema>;

export const changePasswordSchema: ValidatorSchema = {
  body: changePasswordBodySchema,
};
