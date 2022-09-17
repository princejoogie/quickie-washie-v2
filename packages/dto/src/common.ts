import { type ZodSchema, z } from "zod";

export interface ValidatorSchema {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}

export const vehicleTypeSchema = z.enum([
  "CONVERTIBLE",
  "HATCHBACK",
  "MINIVAN",
  "PICKUP_TRUCK",
  "SEDAN_2_DOOR",
  "SEDAN_4_DOOR",
  "SPORTS_CAR",
  "STATION_WAGON",
  "SUV",
]);
