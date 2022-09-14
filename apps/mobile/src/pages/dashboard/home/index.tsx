import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { Layout } from "../../../components";
import { useAuthContext } from "../../../contexts/auth-context";
import { DashboardParamList } from "../types";

export const Home = ({}: BottomTabScreenProps<DashboardParamList, "Home">) => {
  const { data } = useAuthContext();

  return (
    <Layout nav={{ title: "Home" }}>
      <Text className="mt-4 text-white">{JSON.stringify(data, null, 2)}</Text>
    </Layout>
  );
};
