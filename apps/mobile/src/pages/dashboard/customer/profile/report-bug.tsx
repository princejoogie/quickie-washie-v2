import { Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout } from "../../../../components";
import { CustomerProfileStackParamList } from "./types";

export const ReportBug = ({
  navigation,
}: NativeStackScreenProps<CustomerProfileStackParamList, "ReportBug">) => {
  return (
    <Layout
      nav={{
        title: "Report Bug",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
      }}
    >
      <Text className="mt-4 text-white">Report bug</Text>
    </Layout>
  );
};
