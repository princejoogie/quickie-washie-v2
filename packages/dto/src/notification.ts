import { Prisma } from "@qw/db";
import type { Prisma as PrismaType } from "@qw/db";

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
