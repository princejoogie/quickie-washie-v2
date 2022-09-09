import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TabBar } from "../../components/tab-bar";
import { RootStackParamList } from "../types";

import { Home } from "./home";
import { Profile } from "./profile";
import { Appointments } from "./appointments";
import { Vehicles } from "./vehicles";

const Tab = createBottomTabNavigator();

export const Dashboard = ({}: NativeStackScreenProps<
  RootStackParamList,
  "Dashboard"
>) => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "green" }}
      screenOptions={{ headerShown: false }}
      tabBar={TabBar}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Vehicles" component={Vehicles} />
      <Tab.Screen name="Appointments" component={Appointments} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
