import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { CustomerTabBar } from "../../../components";
import { RootStackParamList } from "../../types";

import { CustomerBottomTab } from "./types";
import { Home } from "./home";
import { Notifications } from "./notifications";
import { Profile } from "./profile";
import { Vehicles } from "./vehicles";
import { Appointments } from "./appointments";

export const CustomerDashboard = ({}: NativeStackScreenProps<
  RootStackParamList,
  "CustomerDashboard"
>) => {
  return (
    <CustomerBottomTab.Navigator
      sceneContainerStyle={{ backgroundColor: "#111827" }}
      screenOptions={{ headerShown: false }}
      tabBar={CustomerTabBar}
      initialRouteName="Home"
    >
      <CustomerBottomTab.Screen name="Home" component={Home} />
      <CustomerBottomTab.Screen name="Vehicles" component={Vehicles} />
      <CustomerBottomTab.Screen name="Appointments" component={Appointments} />
      <CustomerBottomTab.Screen
        name="Notifications"
        component={Notifications}
      />
      <CustomerBottomTab.Screen name="Profile" component={Profile} />
    </CustomerBottomTab.Navigator>
  );
};
