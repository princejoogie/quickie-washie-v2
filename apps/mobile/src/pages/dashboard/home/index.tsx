import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Layout } from "../../../components";
import { DashboardParamList } from "../types";

export const Home = ({}: BottomTabScreenProps<DashboardParamList, "Home">) => {
  return <Layout nav={{ title: "Home" }}>{null}</Layout>;
};
