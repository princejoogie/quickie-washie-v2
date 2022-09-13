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
//
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
