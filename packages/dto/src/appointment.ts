import { z } from "zod";
import { Prisma } from "@qw/db";
import type { Prisma as PrismaType } from "@qw/db";
import type { ValidatorSchema } from "./common";

// CREATE

export const createAppointmentBodySchema = z.object({
  userId: z.string().cuid(),
  vehicleId: z.string().cuid(),
  serviceId: z.string().cuid(),
  additionalPriceId: z.string().cuid(),
  date: z.string().min(1),
});

export type CreateAppointmentBody = z.infer<typeof createAppointmentBodySchema>;

export const createAppointmentResponseSchema =
  Prisma.validator<PrismaType.AppointmentArgs>()({
    include: {
      AdditionalPrice: true,
      Service: true,
      Vehicle: true,
      User: {
        select: {
          id: true,
          email: true,
          name: true,
          licenseUrl: true,
          photoUrl: true,
        },
      },
    },
  });

export type CreateAppointmentResponse = PrismaType.AppointmentGetPayload<
  typeof createAppointmentResponseSchema
>;

export const createAppointmentSchema: ValidatorSchema = {
  body: createAppointmentBodySchema,
};

// GET ALL

const getAllAppointmentsResponse =
  Prisma.validator<PrismaType.AppointmentArgs>()({
    include: {
      AdditionalPrice: true,
      Service: true,
      Vehicle: true,
      User: {
        select: {
          id: true,
          email: true,
          name: true,
          licenseUrl: true,
          photoUrl: true,
        },
      },
    },
  });

export type GetAllAppointmentsResponse = Array<
  PrismaType.AppointmentGetPayload<typeof getAllAppointmentsResponse>
>;
