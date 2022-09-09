import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

import { Home } from "./home";

const Tab = createBottomTabNavigator();

export const Dashboard = ({}: NativeStackScreenProps<
  RootStackParamList,
  "Dashboard"
>) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};
