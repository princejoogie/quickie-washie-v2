import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Layout } from "../../../../components";
import { AdminDashboardParamList } from "../types";

export const Notifications = ({}: BottomTabScreenProps<
  AdminDashboardParamList,
  "Notifications"
>) => {
  return <Layout nav={{ title: "Notifications" }}>{null}</Layout>;
};
