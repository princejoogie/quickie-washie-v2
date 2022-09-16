import { z } from "zod";
import { Prisma } from "@qw/db";
import type { Prisma as PrismaType } from "@qw/db";
import type { ValidatorSchema } from "./common";

// Create

const createServiceBodySchema = z.object({
  name: z.string().min(1).max(255),
  basePrice: z.number().min(0),
  description: z.string().min(1).max(255),
  additionalPrices: z.array(
    z.object({
      price: z.number().min(0),
      vehicleType: z.string().min(1).max(255),
    })
  ),
});

export type CreateServiceBody = z.infer<typeof createServiceBodySchema>;

export const createServiceResponseSchema =
  Prisma.validator<PrismaType.ServiceArgs>()({
    select: {
      id: true,
      name: true,
      basePrice: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });

export type CreateServiceResponse = PrismaType.ServiceGetPayload<
  typeof createServiceResponseSchema
>;

export const createServiceSchema: ValidatorSchema = {
  body: createServiceBodySchema,
};

// UPDATE

export const updateServiceBodySchema = z.object({
  name: z.string().min(1).max(255).optional(),
  basePrice: z.number().min(0).optional(),
  description: z.string().min(1).max(255).optional(),
  additionalPrices: z
    .array(
      z.object({
        price: z.number().min(0),
        vehicleType: z.string().min(1).max(255),
      })
    )
    .optional(),
});

export type UpdateServiceBody = z.infer<typeof updateServiceBodySchema>;

export const updateServiceParamsSchema = z.object({
  serviceId: z.string().cuid(),
});

export type UpdateServiceParams = z.infer<typeof updateServiceParamsSchema>;

const updateServiceResponseSchema = Prisma.validator<PrismaType.ServiceArgs>()({
  select: {
    id: true,
    name: true,
    basePrice: true,
    description: true,
    createdAt: true,
    updatedAt: true,
  },
});

export type UpdateServiceResponse = PrismaType.ServiceGetPayload<
  typeof updateServiceResponseSchema
>;

export const updateServiceSchema: ValidatorSchema = {
  body: updateServiceBodySchema,
  params: updateServiceParamsSchema,
};

// DELETE

export const deleteServiceParamsSchema = z.object({
  serviceId: z.string().cuid(),
});

export type DeleteServiceParams = z.infer<typeof deleteServiceParamsSchema>;

export type DeleteServiceResponse = boolean;

export const deleteServiceSchema: ValidatorSchema = {
  params: deleteServiceParamsSchema,
};

// GET BY ID

export const getServiceByIdParamsSchema = z.object({
  serviceId: z.string().cuid(),
});

export type GetServiceByIdParams = z.infer<typeof getServiceByIdParamsSchema>;

export const getServiceByIdResponse =
  Prisma.validator<PrismaType.ServiceArgs>()({
    select: {
      id: true,
      name: true,
      basePrice: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      additionalPrices: true,
      appointments: {
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          date: true,
          status: true,
          Vehicle: {
            select: {
              plateNumber: true,
              model: true,
              type: true,
            },
          },
        },
      },
    },
  });

export type GetServiceByIdResponse = PrismaType.ServiceGetPayload<
  typeof getServiceByIdResponse
>;

export const getServiceByIdSchema: ValidatorSchema = {
  params: getServiceByIdParamsSchema,
};

// GET ALL

const getAllServicesResponse = Prisma.validator<PrismaType.ServiceArgs>()({
  select: {
    id: true,
    name: true,
    basePrice: true,
    description: true,
    createdAt: true,
    updatedAt: true,
  },
});

export type GetAllServicesResponse = Array<
  PrismaType.ServiceGetPayload<typeof getAllServicesResponse>
>;
