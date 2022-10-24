import { Text } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../../../../components";
import reportService from "../../../../services/report";
import { AdminDashboardParamList } from "../types";

export const BugReports = ({}: BottomTabScreenProps<
  AdminDashboardParamList,
  "BugReports"
>) => {
  const reports = useQuery(["bug-reports"], reportService.getAll);

  return (
    <Layout nav={{ title: "Bug Reports" }}>
      <Text className="text-white">
        {JSON.stringify(reports.data, null, 2)}
      </Text>
    </Layout>
  );
};
