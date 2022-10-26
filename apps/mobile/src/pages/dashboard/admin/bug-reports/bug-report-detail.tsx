import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as WebBrowser from "expo-web-browser";

import { Layout, LoadingText, TextField } from "../../../../components";
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
      {report.isLoading ? (
        <LoadingText />
      ) : !!report.data ? (
        <>
          <TextField editable={false} label="Title" value={report.data.title} />

          <TextField
            editable={false}
            multiline
            label="Body"
            value={report.data.body}
          />

          <Text className="mt-4 ml-2 text-xs text-gray-400">Screenshots</Text>
          {report.data.screenshotUrls.length > 0 && (
            <View className="mt-1 flex min-h-[128px] flex-row flex-wrap rounded-lg border-2 border-transparent bg-gray-800 p-2 text-white opacity-100">
              {report.data.screenshotUrls.map((uri, idx) => (
                <TouchableOpacity
                  key={`screenshot-${idx}`}
                  className="relative m-1 h-40 w-[31%] rounded border-2 border-gray-700"
                  onPress={() => {
                    WebBrowser.openBrowserAsync(uri);
                  }}
                >
                  <Image
                    source={{ uri }}
                    className="h-full w-full"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </>
      ) : (
        <Text>Report not found</Text>
      )}
    </Layout>
  );
};
