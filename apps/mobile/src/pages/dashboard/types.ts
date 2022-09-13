import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type DashboardParamList = {
  Home: undefined;
  Vehicles: undefined;
  Appointments: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export enum DashboardParamKeys {
  Home = "Home",
  Vehicles = "Vehicles",
  Appointments = "Appointments",
  Notifications = "Notifications",
  Profile = "Profile",
}

export const BottomTab = createBottomTabNavigator<DashboardParamList>();
