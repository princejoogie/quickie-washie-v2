import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Layout } from "../../../../components";
import { AdminDashboardParamList } from "../types";

export const Services = ({}: BottomTabScreenProps<
  AdminDashboardParamList,
  "Services"
>) => {
  return <Layout nav={{ title: "Services" }}>{null}</Layout>;
};
