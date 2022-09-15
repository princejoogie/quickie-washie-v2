import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { CustomerTabBar } from "../../../components";
import { RootStackParamList } from "../../types";

import { Appointments } from "./appointments";
import { CustomerBottomTab } from "./types";
import { Home } from "./home";
import { Notifications } from "./notifications";
import { Profile } from "./profile";
import { Vehicles } from "./vehicles";

export const UserDashboard = ({}: NativeStackScreenProps<
  RootStackParamList,
  "UserDashboard"
>) => {
  return (
    <CustomerBottomTab.Navigator
      sceneContainerStyle={{ backgroundColor: "#111827" }}
      screenOptions={{ headerShown: false }}
      tabBar={CustomerTabBar}
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
