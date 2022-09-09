import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Text, ScrollView } from "react-native";
import { Layout } from "../../../components";
import { DashboardParamList } from "../types";

export const Home = ({}: BottomTabScreenProps<DashboardParamList, "Home">) => {
  return (
    <Layout>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          flexDirection: "column",
        }}
        style={{ paddingBottom: 100 }}
        className="flex-1 px-6 pt-6 flex-grow"
      >
        <Text className="text-white w-full text-xl text-center">Welcome</Text>
      </ScrollView>
    </Layout>
  );
};
