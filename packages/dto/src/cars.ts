import { z } from "zod";
import { Prisma, User } from "@qw/db";
import type { ValidatorSchema } from "./common";

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
