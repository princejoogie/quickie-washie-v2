import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CustomerDashboardParamList = {
  Home: undefined;
  Vehicles: undefined;
  Appointments: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export enum CustomerDashboardParamKeys {
  Home = "Home",
  Vehicles = "Vehicles",
  Appointments = "Appointments",
  Notifications = "Notifications",
  Profile = "Profile",
}

export const CustomerBottomTab =
  createBottomTabNavigator<CustomerDashboardParamList>();
