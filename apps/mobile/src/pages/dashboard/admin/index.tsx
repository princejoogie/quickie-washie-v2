import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AdminTabBar } from "../../../components";
import { RootStackParamList } from "../../types";

import { AdminBottomTab } from "./types";
import { Services } from "./services";
import { Appointments } from "./appointments";
import { Analytics } from "./analytics";
import { BugReports } from "./bug-reports";
import { Profile } from "./profile";

export const AdminDashboard = ({}: NativeStackScreenProps<
  RootStackParamList,
  "AdminDashboard"
>) => {
  return (
    <AdminBottomTab.Navigator
      sceneContainerStyle={{ backgroundColor: "#111827" }}
      screenOptions={{ headerShown: false }}
      tabBar={AdminTabBar}
    >
      <AdminBottomTab.Screen name="Appointments" component={Appointments} />
      <AdminBottomTab.Screen name="Services" component={Services} />
      <AdminBottomTab.Screen name="Analytics" component={Analytics} />
      <AdminBottomTab.Screen name="BugReports" component={BugReports} />
      <AdminBottomTab.Screen name="Profile" component={Profile} />
    </AdminBottomTab.Navigator>
  );
};
