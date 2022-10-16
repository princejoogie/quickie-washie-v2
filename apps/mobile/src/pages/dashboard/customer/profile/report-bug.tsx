import { TouchableOpacity, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Layout, TextField } from "../../../../components";
import { useAuthContext } from "../../../../contexts/auth-context";
import { CustomerProfileStackParamList } from "./types";

const reportBugSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .trim(),
  body: z
    .string()
    .min(3, { message: "Body must be at least 3 characters" })
    .trim(),
});

type RegisterSchema = z.infer<typeof reportBugSchema>;

export const ReportBug = ({
  navigation,
}: NativeStackScreenProps<CustomerProfileStackParamList, "ReportBug">) => {
  const {} = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<RegisterSchema>({
    mode: "all",
    resolver: zodResolver(reportBugSchema),
    defaultValues: {
      body: "",
      title: "",
    },
  });

  const isLoading = isSubmitting || isValidating;

  return (
    <Layout
      nav={{
        title: "Report Bug",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
      }}
    >
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value, ...rest } }) => (
          <TextField
            {...rest}
            label="Title *"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.title && (
        <Text className="ml-2 mt-1 text-xs text-red-600">
          {errors.title.message}
        </Text>
      )}

      <Controller
        control={control}
        name="body"
        render={({ field: { onChange, value, ...rest } }) => (
          <TextField
            {...rest}
            label="Body *"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.body && (
        <Text className="ml-2 mt-1 text-xs text-red-600">
          {errors.body.message}
        </Text>
      )}

      <Text className="mt-4 ml-2 text-xs text-gray-400">Screenshots</Text>

      <View className="mt-1 rounded-lg border-2 border-gray-700 bg-gray-800 px-4 py-3 text-white opacity-100">
        <Text className="text-white">Select photos</Text>
      </View>

      <TouchableOpacity
        className={`mt-6 self-end rounded-lg border-2 border-green-500 bg-green-600 px-8 py-2 ${
          isLoading ? "opacity-50" : "opacity-100"
        }`}
        disabled={isLoading}
        onPress={handleSubmit(async ({ body, title }) => {
          console.log({ body, title });
        })}
      >
        <Text className="text-white">
          {isLoading ? "Loading..." : "Submit report"}
        </Text>
      </TouchableOpacity>
    </Layout>
  );
};
