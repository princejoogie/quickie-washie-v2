import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { Layout } from "../../../components";
import { DashboardParamList } from "../types";

export const Vehicles = ({}: BottomTabScreenProps<
  DashboardParamList,
  "Vehicles"
>) => {
  return (
    <Layout>
      <Text className="text-white w-full text-xl text-center">Vehicles</Text>
    </Layout>
  );
};
