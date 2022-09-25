import { z } from "zod";
import { Prisma } from "@qw/db";
import type { Prisma as PrismaType } from "@qw/db";
import type { ValidatorSchema } from "./common";

// GET ALL

export const getAllNotificationsResponse =
  Prisma.validator<PrismaType.NotificationArgs>()({
    select: {
      id: true,
      seen: true,
      title: true,
      createdAt: true,
      content: true,
    },
  });

export type GetAllNotificationsResponse = PrismaType.NotificationGetPayload<
  typeof getAllNotificationsResponse
>[];

// MARK SEEN

export const markNotificationSeenBodySchema = z.object({
  notificationIds: z.array(z.string().cuid()),
});

export type MarkNotificationSeenBody = z.infer<
  typeof markNotificationSeenBodySchema
>;

export type MarkNotificationSeenResponse = boolean;

export const markNotificationSeenSchema: ValidatorSchema = {
  body: markNotificationSeenBodySchema,
};
