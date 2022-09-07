import { Text, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { Layout } from "../components";

export const Home = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "Home">) => {
  const { username } = route.params;

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
        <Text className="text-white w-full text-xl text-center">
          Welcome {username}
        </Text>
      </ScrollView>
    </Layout>
  );
};
