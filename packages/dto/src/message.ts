import { z } from "zod";
import { Prisma } from "@qw/db";
import type { Prisma as PrismaType } from "@qw/db";
import type { ValidatorSchema } from "./common";

// CREATE

export const createMessageBodySchema = z.object({
  content: z.string().min(1).max(1000),
});

export type CreateMessageBodySchema = z.infer<typeof createMessageBodySchema>;

export const createMessageParamsSchema = z.object({
  appointmentId: z.string().cuid(),
});

export type CreateMessageParamsSchema = z.infer<
  typeof createMessageParamsSchema
>;

export const createMessageResponseSchema =
  Prisma.validator<PrismaType.MessageArgs>()({
    select: {
      content: true,
      createdAt: true,
      seen: true,
      User: {
        select: {
          photoUrl: true,
          name: true,
          privilege: true,
          id: true,
        },
      },
    },
  });

export type CreateMessageResponseSchema = PrismaType.MessageGetPayload<
  typeof createMessageResponseSchema
>;

export const createMessageSchema: ValidatorSchema = {
  body: createMessageBodySchema,
  params: createMessageParamsSchema,
};

// GET ALL

export const getAllMessagesParamsSchema = z.object({
  appointmentId: z.string().cuid(),
});

export type GetAllMessagesParamsSchema = z.infer<
  typeof getAllMessagesParamsSchema
>;

export const getAllMessagesResponseSchema =
  Prisma.validator<PrismaType.MessageArgs>()({
    select: {
      content: true,
      createdAt: true,
      seen: true,
      User: {
        select: {
          photoUrl: true,
          name: true,
          privilege: true,
          id: true,
        },
      },
    },
  });

export type GetAllMessagesResponseSchema = Array<
  PrismaType.MessageGetPayload<typeof getAllMessagesResponseSchema>
>;

export const getAllMessagesSchema: ValidatorSchema = {
  params: getAllMessagesParamsSchema,
};
