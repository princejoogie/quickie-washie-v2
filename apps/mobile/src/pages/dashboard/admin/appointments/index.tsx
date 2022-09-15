import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Layout } from "../../../../components";
import { AdminDashboardParamList } from "../types";

export const Appointments = ({}: BottomTabScreenProps<
  AdminDashboardParamList,
  "Appointments"
>) => {
  return <Layout nav={{ title: "Appointments" }}>{null}</Layout>;
};
