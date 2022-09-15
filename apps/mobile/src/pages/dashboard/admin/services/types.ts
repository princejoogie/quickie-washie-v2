import { GetAllServicesResponse } from "@qw/dto";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ServicesStackParamList = {
  AllServices: undefined;
  NewService: undefined;
  ServiceDetail: GetAllServicesResponse[number];
};

export const ServicesStack =
  createNativeStackNavigator<ServicesStackParamList>();
