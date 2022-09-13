import { z } from "zod";
import { Prisma } from "@qw/db";
import type { ValidatorSchema } from "./common";

// Create

export const createServiceBodySchema = z.object({
  name: z.string(),
  basePrice: z.number(),
  description: z.string(),
  additionalPrices: z.array(
    z.object({
      price: z.number(),
      vehicleType: z.string(),
    })
  ),
});

export type CreateServiceBody = z.infer<typeof createServiceBodySchema>;

const createServiceResponseSchema = Prisma.validator<Prisma.ServiceArgs>()({
  select: {
    id: true,
    name: true,
    basePrice: true,
    description: true,
    createdAt: true,
    updatedAt: true,
  },
});

export type CreateServiceResponse = Prisma.ServiceGetPayload<
  typeof createServiceResponseSchema
>;

export const createServiceSchema: ValidatorSchema = {
  body: createServiceBodySchema,
};

// UPDATE

export const updateServiceBodySchema = z.object({
  name: z.string().optional(),
  basePrice: z.number().optional(),
  description: z.string().optional(),
  additionalPrices: z
    .array(
      z.object({
        price: z.number(),
        vehicleType: z.string(),
      })
    )
    .optional(),
});

export type UpdateServiceBody = z.infer<typeof updateServiceBodySchema>;

export const updateServiceParamsSchema = z.object({
  serviceId: z.string().cuid(),
});

export type UpdateServiceParams = z.infer<typeof updateServiceParamsSchema>;

const updateServiceResponseSchema = Prisma.validator<Prisma.ServiceArgs>()({
  select: {
    id: true,
    name: true,
    basePrice: true,
    description: true,
    createdAt: true,
    updatedAt: true,
  },
});

export type UpdateServiceResponse = Prisma.ServiceGetPayload<
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

// GET ALL

const getAllServicesResponse = Prisma.validator<Prisma.ServiceArgs>()({
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
  Prisma.ServiceGetPayload<typeof getAllServicesResponse>
>;
