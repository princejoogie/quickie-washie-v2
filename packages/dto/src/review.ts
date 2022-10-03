import { z } from "zod";
import { Prisma } from "@qw/db";
import type { Prisma as PrismaType } from "@qw/db";
import type { ValidatorSchema } from "./common";

// CREATE

export const createReviewBodySchema = z.object({
  content: z.string().min(1).max(255),
  rating: z.number().min(1).max(5),
});

export type CreateReviewBody = z.infer<typeof createReviewBodySchema>;

export const createReviewParamsSchema = z.object({
  appointmentId: z.string().cuid(),
});

export type CreateReviewParams = z.infer<typeof createReviewParamsSchema>;

export const createReviewResponseSchema =
  Prisma.validator<PrismaType.ReviewArgs>()({
    select: {
      id: true,
      appointmentId: true,
      userId: true,
      content: true,
      rating: true,
      createdAt: true,
    },
  });

export type CreateReviewResponse = PrismaType.ReviewGetPayload<
  typeof createReviewResponseSchema
>;

export const createReviewSchema: ValidatorSchema = {
  body: createReviewBodySchema,
  params: createReviewParamsSchema,
};

// GET ALL

export const getAllReviewsResponseSchema =
  Prisma.validator<PrismaType.ReviewArgs>()({
    select: {
      id: true,
      content: true,
      rating: true,
      createdAt: true,
      User: {
        select: {
          name: true,
          photoUrl: true,
        },
      },
      Appointment: {
        select: {
          id: true,
          Service: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

export type GetAllReviewsResponse = Array<
  PrismaType.ReviewGetPayload<typeof getAllReviewsResponseSchema>
>;
