import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Layout } from "../../../../components";
import { CustomerDashboardParamList } from "../types";

export const Appointments = ({}: BottomTabScreenProps<
  CustomerDashboardParamList,
  "Appointments"
>) => {
  return <Layout nav={{ title: "Appointments" }}>{null}</Layout>;
};
