import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Layout } from "../../../../components";
import { AdminDashboardParamList } from "../types";

export const BugReports = ({}: BottomTabScreenProps<
  AdminDashboardParamList,
  "BugReports"
>) => {
  return <Layout nav={{ title: "Bug Reports" }}>{null}</Layout>;
};
