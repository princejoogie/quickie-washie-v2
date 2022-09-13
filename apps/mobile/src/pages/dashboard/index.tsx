import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TabBar } from "../../components";
import { RootStackParamList } from "../types";

import { Appointments } from "./appointments";
import { BottomTab } from "./types";
import { Home } from "./home";
import { Notifications } from "./notifications";
import { Profile } from "./profile";
import { Vehicles } from "./vehicles";

export const Dashboard = ({}: NativeStackScreenProps<
  RootStackParamList,
  "Dashboard"
>) => {
  return (
    <BottomTab.Navigator
      sceneContainerStyle={{ backgroundColor: "#111827" }}
      screenOptions={{ headerShown: false }}
      tabBar={TabBar}
    >
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Vehicles" component={Vehicles} />
      <BottomTab.Screen name="Appointments" component={Appointments} />
      <BottomTab.Screen name="Notifications" component={Notifications} />
      <BottomTab.Screen name="Profile" component={Profile} />
    </BottomTab.Navigator>
  );
};
