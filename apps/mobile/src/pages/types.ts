import { createNativeStackNavigator } from "@react-navigation/native-stack";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  Home: { username: string };
  Login: undefined;
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();
