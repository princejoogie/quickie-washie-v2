import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { View, Text, TouchableOpacity } from "react-native";

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
  const isFocused = useIsFocused();

  if (isFocused && reports.isStale) {
    reports.refetch();
  }

  return (
    <Layout
      noPadding
      nav={{ title: "Bug Reports" }}
      onRefresh={reports.refetch}
    >
      {reports.data?.map((bug, idx) => (
        <TouchableOpacity
          key={bug.id}
          className={`relative p-4 ${
            idx > 0 ? "border-t border-gray-700" : ""
          } ${bug.seen ? "" : "bg-gray-800"}`}
        >
          {!bug.seen && (
            <View className="absolute top-3 right-3 h-2 w-2 rounded-full bg-green-500" />
          )}

          <Text
            className="absolute bottom-2 right-2 text-gray-500"
            style={{ fontSize: 10 }}
          >
            {formatDistanceToNow(new Date(bug.createdAt), {
              addSuffix: true,
            })}
          </Text>

          <Text
            className="w-full font-bold text-white"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {bug.title}{" "}
          </Text>

          <Text
            className="mt-2 mb-4 w-full text-xs text-gray-300"
            numberOfLines={4}
            ellipsizeMode="tail"
          >
            {bug.body}{" "}
          </Text>
        </TouchableOpacity>
      ))}
    </Layout>
  );
};
