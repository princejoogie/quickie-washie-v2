import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Layout } from "../../../components";
import { DashboardParamList } from "../types";

export const Notifications = ({}: BottomTabScreenProps<
  DashboardParamList,
  "Notifications"
>) => {
  return <Layout nav={{ title: "Notifications" }}>{null}</Layout>;
};
