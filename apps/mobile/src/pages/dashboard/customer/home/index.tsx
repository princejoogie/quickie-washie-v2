import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Layout } from "../../../../components";
import { CustomerDashboardParamList } from "../types";

export const Home = ({}: BottomTabScreenProps<
  CustomerDashboardParamList,
  "Home"
>) => {
  return <Layout nav={{ title: "Home" }}>{null}</Layout>;
};
