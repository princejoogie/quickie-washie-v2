import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Layout } from "../../../components";
import { DashboardParamList } from "../types";

export const Vehicles = ({}: BottomTabScreenProps<
  DashboardParamList,
  "Vehicles"
>) => {
  return <Layout nav={{ title: "Vehicles" }}>{null}</Layout>;
};
