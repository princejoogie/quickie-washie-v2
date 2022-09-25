import { createNativeStackNavigator } from "@react-navigation/native-stack";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AdminProfileStackParamList = {
  ProfileDetail: undefined;
  ChangePassword: undefined;
};

export const AdminProfileStack =
  createNativeStackNavigator<AdminProfileStackParamList>();
