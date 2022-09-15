import { createNativeStackNavigator } from "@react-navigation/native-stack";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  UserDashboard: undefined;
  AdminDashboard: undefined;
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();
