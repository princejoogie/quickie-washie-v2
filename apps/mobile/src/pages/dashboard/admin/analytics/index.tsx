import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Layout } from "../../../../components";
import { AdminDashboardParamList } from "../types";

export const Analytics = ({}: BottomTabScreenProps<
  AdminDashboardParamList,
  "Analytics"
>) => {
  return <Layout nav={{ title: "Analytics" }}>{null}</Layout>;
};
