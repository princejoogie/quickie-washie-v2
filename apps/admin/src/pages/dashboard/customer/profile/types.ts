import { createNativeStackNavigator } from "@react-navigation/native-stack";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CustomerProfileStackParamList = {
  ProfileDetail: undefined;
  ChangePassword: undefined;
  ReportBug: undefined;
};

export const CustomerProfileStack =
  createNativeStackNavigator<CustomerProfileStackParamList>();
