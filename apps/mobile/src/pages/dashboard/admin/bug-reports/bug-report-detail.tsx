import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { Layout } from "../../../../components";
import { BugReportStackParamList } from "./types";

export const BugReportDetail = ({}: NativeStackScreenProps<
  BugReportStackParamList,
  "BugReportDetail"
>) => {
  return (
    <Layout nav={{ title: "Report Detail" }}>
      <Text>Bug Report Detail</Text>
    </Layout>
  );
};
