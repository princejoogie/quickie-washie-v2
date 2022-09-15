import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AdminDashboardParamList = {
  Appointments: undefined;
  Services: undefined;
  Analytics: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export enum AdminDashboardParamKeys {
  Appointments = "Appointments",
  Services = "Services",
  Analytics = "Analytics",
  Notifications = "Notifications",
  Profile = "Profile",
}

export const AdminBottomTab =
  createBottomTabNavigator<AdminDashboardParamList>();
