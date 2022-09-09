import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Layout } from "../../../components";
import { DashboardParamList } from "../types";

export const Appointments = ({}: BottomTabScreenProps<
  DashboardParamList,
  "Appointments"
>) => {
  return <Layout nav={{ title: "Appointments" }}>{null}</Layout>;
};
