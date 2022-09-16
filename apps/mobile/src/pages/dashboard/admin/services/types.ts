import { GetAllServicesResponse } from "@qw/dto";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ServicesStackParamList = {
  AllServices: undefined;
  NewService: undefined;
  ServiceDetail: GetAllServicesResponse[number];
};

export const ServicesStack =
  createNativeStackNavigator<ServicesStackParamList>();

export const serviceBodySchema = z.object({
  name: z.string().min(1, { message: "Invalid name" }).max(255),
  basePrice: z.string().min(1, { message: "Should be greater than 0" }),
  description: z.string().min(1, { message: "Invalid description" }).max(255),
  additionalPrices: z.array(
    z.object({
      price: z.string().min(1, { message: "Should be greater than 0" }),
      vehicleType: z
        .string()
        .min(1, { message: "Invalid Vehicle type" })
        .max(255),
    })
  ),
});

export type ServiceBodySchema = z.infer<typeof serviceBodySchema>;
