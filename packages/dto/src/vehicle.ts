import { z } from "zod";
import { Prisma } from "@qw/db";
import type { Prisma as PrismaType } from "@qw/db";
import type { ValidatorSchema } from "./common";

// Create

export const createVehicleBodySchema = z.object({
  plateNumber: z.string().min(1).max(10),
  model: z.string().min(1).max(25),
  type: z.string().min(1).max(50),
});

export type CreateVehicleBody = z.infer<typeof createVehicleBodySchema>;

const createVehicleResponse = Prisma.validator<PrismaType.VehicleArgs>()({
  select: {
    id: true,
    createdAt: true,
    updatedAt: true,
    plateNumber: true,
    model: true,
    type: true,
  },
});

export type CreateVehicleResponse = PrismaType.VehicleGetPayload<
  typeof createVehicleResponse
>;

export const createVehicleSchema: ValidatorSchema = {
  body: createVehicleBodySchema,
};

// UPDATE

export const updateVehicleBodySchema = z.object({
  plateNumber: z.string().min(1).max(10).optional(),
  model: z.string().min(1).max(25).optional(),
  type: z.string().min(1).max(50).optional(),
});

export type UpdateVehicleBody = z.infer<typeof updateVehicleBodySchema>;

export const updateVehicleParamsSchema = z.object({
  vehicleId: z.string().cuid(),
});

export type UpdateVehicleParams = z.infer<typeof updateVehicleParamsSchema>;

export const updateVehicleResponse = Prisma.validator<PrismaType.VehicleArgs>()(
  {
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      plateNumber: true,
      model: true,
      type: true,
    },
  }
);

export type UpdateVehicleResponse = PrismaType.VehicleGetPayload<
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

export const getVehicleByIdResponse =
  Prisma.validator<PrismaType.VehicleArgs>()({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      plateNumber: true,
      model: true,
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

export type GetVehicleByIdResponse = PrismaType.VehicleGetPayload<
  typeof getVehicleByIdResponse
>;

export const getVehicleByIdSchema: ValidatorSchema = {
  params: getVehicleByIdParamsSchema,
};

// GET ALL

const getAllVehiclesResponse = Prisma.validator<PrismaType.VehicleArgs>()({
  select: {
    id: true,
    createdAt: true,
    updatedAt: true,
    plateNumber: true,
    model: true,
    type: true,
  },
});

export type GetAllVehiclesResponse = Array<
  PrismaType.VehicleGetPayload<typeof getAllVehiclesResponse>
>;
