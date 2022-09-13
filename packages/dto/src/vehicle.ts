import { z } from "zod";
import { Prisma } from "@qw/db";
import type { ValidatorSchema } from "./common";

// Create

export const createVehicleBodySchema = z.object({
  plateNumber: z.string(),
  type: z.string(),
});

export type CreateVehicleBody = z.infer<typeof createVehicleBodySchema>;

const createVehicleResponse = Prisma.validator<Prisma.VehicleArgs>()({
  select: {
    id: true,
    createdAt: true,
    updatedAt: true,
    plateNumber: true,
    type: true,
  },
});

export type CreateVehicleResponse = Prisma.VehicleGetPayload<
  typeof createVehicleResponse
>;

export const createVehicleSchema: ValidatorSchema = {
  body: createVehicleBodySchema,
};

// UPDATE

export const updateVehicleBodySchema = z.object({
  plateNumber: z.string().optional(),
  type: z.string().optional(),
});

export type UpdateVehicleBody = z.infer<typeof updateVehicleBodySchema>;

export const updateVehicleParamsSchema = z.object({
  vehicleId: z.string().cuid(),
});

export type UpdateVehicleParams = z.infer<typeof updateVehicleParamsSchema>;

export const updateVehicleResponse = Prisma.validator<Prisma.VehicleArgs>()({
  select: {
    id: true,
    createdAt: true,
    updatedAt: true,
    plateNumber: true,
    type: true,
  },
});

export type UpdateVehicleResponse = Prisma.VehicleGetPayload<
  typeof updateVehicleResponse
>;

export const updateVehicleSchema: ValidatorSchema = {
  body: updateVehicleBodySchema,
  params: updateVehicleParamsSchema,
};

// DELETE

export const deleteVehicleParamsSchema = z.object({
  vehicleId: z.string().cuid(),
});

export type DeleteVehicleParams = z.infer<typeof deleteVehicleParamsSchema>;

export type DeleteVehicleResponse = boolean;

export const deleteVehicleSchema: ValidatorSchema = {
  params: deleteVehicleParamsSchema,
};

// GET BY ID

export const getVehicleByIdParamsSchema = z.object({
  vehicleId: z.string().cuid(),
});

export type GetVehicleByIdParams = z.infer<typeof getVehicleByIdParamsSchema>;

export const getVehicleByIdResponse = Prisma.validator<Prisma.VehicleArgs>()({
  select: {
    id: true,
    createdAt: true,
    updatedAt: true,
    plateNumber: true,
    type: true,
    appointments: {
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        date: true,
        status: true,
        Service: {
          select: {
            name: true,
            description: true,
            additionalPrices: true,
          },
        },
      },
    },
  },
});

export type GetVehicleByIdResponse = Prisma.VehicleGetPayload<
  typeof getVehicleByIdResponse
>;

export const getVehicleByIdSchema: ValidatorSchema = {
  params: getVehicleByIdParamsSchema,
};

// GET ALL

const getAllVehiclesResponse = Prisma.validator<Prisma.VehicleArgs>()({
  select: {
    id: true,
    createdAt: true,
    updatedAt: true,
    plateNumber: true,
    type: true,
  },
});

export type GetAllVehiclesResponse = Array<
  Prisma.VehicleGetPayload<typeof getAllVehiclesResponse>
>;
