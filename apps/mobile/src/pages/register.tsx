import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import authService from "../services/auth";
import { ChevronIcon } from "../components/icon/chevron-icon";
import { Layout, TextField, ImageInput } from "../components";
import { PencilSquareIcon } from "../components/icon/pencil-square-icon";
import { getImage } from "../utils/helpers";

import { RootStackParamList } from "./types";
import { uploadImage } from "../services/firebase";

const registerSchema = z
  .object({
    email: z.string().email().trim(),
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters" }),
    licenseUrl: z
      .string()
      .min(1, { message: "Please upload a license" })
      .url()
      .trim(),
    imageUrl: z
      .string()
      .min(1, { message: "Please upload a profile picture" })
      .url()
      .trim(),
    name: z.string().min(1, { message: "Invalid name" }).trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export const Register = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Register">) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<RegisterSchema>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      imageUrl: "",
      licenseUrl: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const register = useMutation(authService.register, {
    onSuccess: async () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    },
  });

  const isLoading = isSubmitting || isValidating || register.isLoading;

  return (
    <Layout>
      {navigation.canGoBack() && (
        <TouchableOpacity
          className="mt-4 self-start flex-row items-center w-auto"
          onPress={() => navigation.goBack()}
        >
          <ChevronIcon direction="left" styleName="h-5 w-5 text-blue-600" />
          <Text className="text-blue-600 w-min">Back</Text>
        </TouchableOpacity>
      )}

      <View className="mt-4">
        <Text className="w-full text-2xl font-bold text-white">
          Register to Quickie Washie
        </Text>
        <Text className="mt-1 text-gray-400">
          We&apos;re excited to have you!
        </Text>
      </View>

      <View className="flex items-center mt-8">
        <View className="bg-gray-800 h-32 w-32 border-2 border-gray-700 rounded-full flex items-center justify-center">
          <Controller
            control={control}
            name="imageUrl"
            render={({ field: { onChange, value, onBlur } }) => (
              <TouchableOpacity
                onBlur={onBlur}
                className="w-full h-full flex items-center justify-center"
                onPress={async () => {
                  const res = await getImage({ aspect: [1, 1] });
                  if (res) onChange(res.uri);
                }}
              >
                {!value ? (
                  <PencilSquareIcon styleName="text-blue-600" />
                ) : (
                  <Image
                    className="h-full w-full rounded-full"
                    source={{ uri: value }}
                  />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      {errors.imageUrl && (
        <Text className="text-xs text-center text-red-600 ml-2 mt-1">
          {errors.imageUrl.message}
        </Text>
      )}

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value, ...rest } }) => (
          <TextField
            {...rest}
            label="Full name *"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && (
        <Text className="text-xs text-red-600 ml-2 mt-1">
          {errors.name.message}
        </Text>
      )}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, ...rest } }) => (
          <TextField
            {...rest}
            label="Email *"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && (
        <Text className="text-xs text-red-600 ml-2 mt-1">
          {errors.email.message}
        </Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, ...rest } }) => (
          <TextField
            {...rest}
            label="Password *"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && (
        <Text className="text-xs text-red-600 ml-2 mt-1">
          {errors.password.message}
        </Text>
      )}

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value, ...rest } }) => (
          <TextField
            {...rest}
            label="Confirm password *"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text className="text-xs text-red-600 ml-2 mt-1">
          {errors.confirmPassword.message}
        </Text>
      )}

      <Controller
        control={control}
        name="licenseUrl"
        render={({ field: { onChange, value } }) => (
          <ImageInput
            label="Drivers license *"
            uri={value}
            callback={async (e) => {
              if (e) onChange(e.uri);
            }}
          />
        )}
      />
      {errors.licenseUrl && (
        <Text className="text-xs text-red-600 ml-2 mt-1">
          {errors.licenseUrl.message}
        </Text>
      )}

      <TouchableOpacity
        className="bg-green-600 self-end mt-6 px-8 py-2 rounded-lg border-2 border-green-500 disabled:opacity-50"
        disabled={isLoading}
        onPress={handleSubmit(
          async ({ licenseUrl, imageUrl, confirmPassword, ...rest }) => {
            const licenseDownloadUrl = await uploadImage(
              licenseUrl,
              (progress) => {
                console.log(`${progress}%`);
              }
            );
            const imageDownloadUrl = await uploadImage(imageUrl, (progress) => {
              console.log(`${progress}%`);
            });

            await register.mutateAsync({
              ...rest,
              licenseUrl: licenseDownloadUrl,
              imageUrl: imageDownloadUrl,
            });
          }
        )}
      >
        <Text className="text-white">
          {isLoading ? "Loading..." : "Register"}
        </Text>
      </TouchableOpacity>
    </Layout>
  );
};
