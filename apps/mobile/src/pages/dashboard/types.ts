import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type DashboardParamList = {
  Home: undefined;
  Vehicles: undefined;
  Appointments: undefined;
  Profile: undefined;
};

export const BottomTab = createBottomTabNavigator<DashboardParamList>();
