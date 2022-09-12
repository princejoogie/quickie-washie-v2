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

export type CreateVehicleResponse = Prisma.VehicleGetPayload<
  typeof createVehicleResponse
>;

export const createVehicleSchema: ValidatorSchema = {
  body: createVehicleBodySchema,
};

// DELETE

export const deleteVehicleBodySchema = z.object({
  vehicleId: z.string().cuid(),
});

export type DeleteVehicleBody = z.infer<typeof deleteVehicleBodySchema>;

export type DeleteVehicleResponse = boolean;

export const deleteVehicleSchema: ValidatorSchema = {
  body: deleteVehicleBodySchema,
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
