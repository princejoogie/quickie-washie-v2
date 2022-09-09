import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TabBar } from "../../components/tab-bar";
import { RootStackParamList } from "../types";

import { Home } from "./home";
import { Profile } from "./profile";
import { Appointments } from "./appointments";
import { Vehicles } from "./vehicles";
import { BottomTab } from "./types";

export const Dashboard = ({}: NativeStackScreenProps<
  RootStackParamList,
  "Dashboard"
>) => {
  return (
    <BottomTab.Navigator
      sceneContainerStyle={{ backgroundColor: "green" }}
      screenOptions={{ headerShown: false }}
      tabBar={TabBar}
    >
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Vehicles" component={Vehicles} />
      <BottomTab.Screen name="Appointments" component={Appointments} />
      <BottomTab.Screen name="Profile" component={Profile} />
    </BottomTab.Navigator>
  );
};
