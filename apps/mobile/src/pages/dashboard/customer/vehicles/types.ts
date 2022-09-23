import { createNativeStackNavigator } from "@react-navigation/native-stack";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type VehiclesStackParamList = {
  AllVehicles: undefined;
  NewVehicle: undefined;
  VehicleDetail: { vehicleId: string };
};

export const VehiclesStack =
  createNativeStackNavigator<VehiclesStackParamList>();
