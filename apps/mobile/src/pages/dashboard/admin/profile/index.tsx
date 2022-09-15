import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Layout } from "../../../../components";
import { AdminDashboardParamList } from "../types";

export const Profile = ({}: BottomTabScreenProps<
  AdminDashboardParamList,
  "Profile"
>) => {
  return <Layout nav={{ title: "Profile" }}>{null}</Layout>;
};
