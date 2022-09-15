import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Layout } from "../../../../components";
import { CustomerDashboardParamList } from "../types";

export const Notifications = ({}: BottomTabScreenProps<
  CustomerDashboardParamList,
  "Notifications"
>) => {
  return <Layout nav={{ title: "Notifications" }}>{null}</Layout>;
};
