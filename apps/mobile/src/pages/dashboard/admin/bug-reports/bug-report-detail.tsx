import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native";
import { Layout } from "../../../../components";
import reportService from "../../../../services/report";
import { BugReportStackParamList } from "./types";

export const BugReportDetail = ({
  navigation,
  route,
}: NativeStackScreenProps<BugReportStackParamList, "BugReportDetail">) => {
  const { bugReportId } = route.params;

  const report = useQuery(["bug-report", bugReportId], (e) =>
    reportService.getById({ reportId: e.queryKey[1] })
  );

  return (
    <Layout
      nav={{
        title: "Report Detail",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
      }}
      onRefresh={report.refetch}
    >
      <Text className="text-white">{JSON.stringify(report.data, null, 2)}</Text>
    </Layout>
  );
};
