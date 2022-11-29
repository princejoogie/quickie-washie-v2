import { createNativeStackNavigator } from "@react-navigation/native-stack";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type BugReportStackParamList = {
  AllBugReports: undefined;
  BugReportDetail: { bugReportId: string };
};

export const BugReportStack =
  createNativeStackNavigator<BugReportStackParamList>();
