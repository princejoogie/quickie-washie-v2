import { z } from "zod";
import { Prisma } from "@qw/db";
import type { Prisma as PrismaType } from "@qw/db";
import type { ValidatorSchema } from "./common";

// CREATE

export const createAppointmentBodySchema = z.object({
  userId: z.string().cuid(),
  vehicleId: z.string().cuid(),
  serviceId: z.string().cuid(),
  additionalPriceId: z.string().cuid().nullable(),
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

// UPDATE

export const updateAppointmentBodySchema = z.object({
  date: z.string().min(1),
  status: z.enum(["PENDING", "ONGOING", "FINISHED", "CANCELLED"]),
});

export type UpdateAppointmentBody = z.infer<typeof updateAppointmentBodySchema>;

export const updateAppointmentParamsSchema = z.object({
  appointmentId: z.string().cuid(),
});

export type UpdateAppointmentParams = z.infer<
  typeof updateAppointmentParamsSchema
>;

export const updateAppointmentResponseSchema =
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

export type UpdateAppointmentResponse = PrismaType.AppointmentGetPayload<
  typeof updateAppointmentResponseSchema
>;

export const updateAppointmentSchema: ValidatorSchema = {
  body: updateAppointmentBodySchema,
  params: updateAppointmentParamsSchema,
};

// DELETE

export const deleteAppointmentParamsSchema = z.object({
  appointmentId: z.string().cuid(),
});

export type DeleteAppointmentParams = z.infer<
  typeof deleteAppointmentParamsSchema
>;

export type DeleteAppointmentResponse = boolean;

export const deleteAppointmentSchema: ValidatorSchema = {
  params: deleteAppointmentParamsSchema,
};

// GET BY ID

export const getAppointmentByIdParamsSchema = z.object({
  appointmentId: z.string().cuid(),
});

export type GetAppointmentByIdParams = z.infer<
  typeof getAppointmentByIdParamsSchema
>;

export const getAppointmentByIdResponseSchema =
  Prisma.validator<PrismaType.AppointmentArgs>()({
    select: {
      _count: {
        select: {
          messages: { where: { seen: false } },
        },
      },
      id: true,
      createdAt: true,
      updatedAt: true,
      status: true,
      date: true,
      documents: true,
      AdditionalPrice: true,
      Service: true,
      Vehicle: true,
      User: {
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          licenseUrl: true,
          photoUrl: true,
        },
      },
    },
  });

export type GetAppointmentByIdResponse = PrismaType.AppointmentGetPayload<
  typeof getAppointmentByIdResponseSchema
>;

export const getAppointmentByIdSchema: ValidatorSchema = {
  params: getAppointmentByIdParamsSchema,
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
