import { createNativeStackNavigator } from "@react-navigation/native-stack";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  Dashboard: { username: string };
  Login: undefined;
  Loading: undefined;
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();
