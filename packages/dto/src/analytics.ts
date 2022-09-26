import { Prisma } from "@qw/db";
import type { Prisma as PrismaType } from "@qw/db";

export const getSalesResponseSchema =
  Prisma.validator<PrismaType.AppointmentArgs>()({
    select: {
      id: true,
      date: true,
      Service: {
        select: {
          basePrice: true,
        },
      },
      AdditionalPrice: {
        select: {
          price: true,
        },
      },
    },
  });

export type GetSalesResponse = Array<
  PrismaType.AppointmentGetPayload<typeof getSalesResponseSchema>
>;
