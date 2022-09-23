import { createNativeStackNavigator } from "@react-navigation/native-stack";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type HomeStackParamList = {
  CustomerHome: undefined;
  AllServices: undefined;
  BookService: {
    serviceId: string;
  };
};

export const HomeStack = createNativeStackNavigator<HomeStackParamList>();
