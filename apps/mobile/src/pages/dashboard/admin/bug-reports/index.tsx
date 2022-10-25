import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Text, TouchableOpacity } from "react-native";

import { Layout } from "../../../../components";
import reportService from "../../../../services/report";
import { AdminDashboardParamList } from "../types";
import { BugReportDetail } from "./bug-report-detail";
import { BugReportStack, BugReportStackParamList } from "./types";

export const BugReports = ({}: BottomTabScreenProps<
  AdminDashboardParamList,
  "BugReports"
>) => {
  return (
    <BugReportStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#111827",
        },
      }}
      initialRouteName="AllBugReports"
    >
      <BugReportStack.Screen name="AllBugReports" component={AllBugReports} />
      <BugReportStack.Screen
        name="BugReportDetail"
        component={BugReportDetail}
      />
    </BugReportStack.Navigator>
  );
};

const AllBugReports = ({}: NativeStackScreenProps<
  BugReportStackParamList,
  "AllBugReports"
>) => {
  const reports = useQuery(["bug-reports"], reportService.getAll);

  return (
    <Layout nav={{ title: "Bug Reports" }}>
      {reports.data?.map((bug) => (
        <TouchableOpacity key={bug.id} className="relative bg-gray-800 p-4">
          <Text className="text-white">{bug.body}</Text>
        </TouchableOpacity>
      ))}
    </Layout>
  );
};
