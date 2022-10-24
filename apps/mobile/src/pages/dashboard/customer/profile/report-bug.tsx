import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Layout, TextField } from "../../../../components";
import { PlusIcon } from "../../../../components/icon/plus-icon";
import authService from "../../../../services/auth";
import { uploadFile } from "../../../../services/firebase";
import reportService from "../../../../services/report";
import { getImage } from "../../../../utils/helpers";
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

  const createReport = useMutation(reportService.create);
  const profile = useQuery(["profile"], authService.profile);
  const [images, setImages] = useState<string[]>([]);
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
            multiline
            numberOfLines={2}
            onChangeText={onChange}
          />
        )}
      />
      {errors.body && (
        <Text className="ml-2 mt-1 text-xs text-red-600">
          {errors.body.message}
        </Text>
      )}

      <View className="mt-4 flex flex-row items-center justify-between">
        <Text className="ml-2 text-xs text-gray-400">Screenshots</Text>
        <TouchableOpacity
          className="mr-2 flex flex-row items-center"
          onPress={async () => {
            const res = await getImage({ allowsEditing: false });
            if (res?.uri) {
              setImages([...images, res.uri]);
            }
          }}
        >
          <Text className="text-xs text-blue-600">Add photo</Text>
          <PlusIcon styleName="w-4 h-4" />
        </TouchableOpacity>
      </View>

      <View className="mt-1 flex min-h-[128px] flex-row flex-wrap rounded-lg border-2 border-gray-700 bg-gray-800 p-2 text-white opacity-100">
        {images.map((uri, idx) => (
          <View
            key={`screenshot-${idx}`}
            className="relative m-1 h-40 w-[31%] rounded border-2 border-gray-700"
          >
            <TouchableOpacity
              activeOpacity={50}
              className="absolute -top-1 -right-1 z-50 rounded-full bg-red-600"
              onPress={() => {
                setImages((e) => e.filter((_, i) => i !== idx));
              }}
            >
              <PlusIcon styleName="rotate-45 text-white h-4 w-4" />
            </TouchableOpacity>

            <Image
              source={{ uri }}
              className="h-full w-full"
              resizeMode="contain"
            />
          </View>
        ))}
      </View>

      <TouchableOpacity
        className={`mt-6 self-end rounded-lg border-2 border-green-500 bg-green-600 px-8 py-2 ${
          isLoading ? "opacity-50" : "opacity-100"
        }`}
        disabled={isLoading}
        onPress={handleSubmit(async ({ body, title }) => {
          let screenshotUrls: string[] = [];

          if (images.length > 0 && profile.data?.email) {
            screenshotUrls = await Promise.all(
              images.map((uri) => uploadFile(uri, profile.data.email))
            );
          }

          await createReport.mutateAsync({
            body,
            title,
            screenshotUrls,
          });

          Alert.alert("Success", "Report has been sent");
          navigation.goBack();
        })}
      >
        <Text className="text-white">
          {isLoading ? "Loading..." : "Submit report"}
        </Text>
      </TouchableOpacity>
    </Layout>
  );
};
