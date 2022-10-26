import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
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
import { uploadFile } from "../services/firebase";
import { useAuthContext } from "../contexts/auth-context";
import Logger from "../lib/logger";

const registerSchema = z
  .object({
    email: z.string().email().trim(),
    phone: z
      .string()
      .trim()
      .min(10, { message: "Invalid phone number" })
      .max(10, { message: "Invalid phone number" }),
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
  const { login } = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<RegisterSchema>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      phone: "",
      imageUrl: "",
      licenseUrl: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const register = useMutation(authService.register, {
    onError: (err: any) => {
      Alert.alert(
        "Register Error",
        err.message ? err.message : JSON.stringify(err, null, 2)
      );
    },
  });
  const sendVerification = useMutation(authService.sendVerificationEmail, {
    onError: (err: any) => {
      Alert.alert(
        "Send Verification Error",
        err.message ? err.message : JSON.stringify(err, null, 2)
      );
    },
  });

  const isLoading =
    isSubmitting ||
    isValidating ||
    register.isLoading ||
    sendVerification.isLoading;

  return (
    <Layout>
      {navigation.canGoBack() && (
        <TouchableOpacity
          className="mt-4 w-auto flex-row items-center self-start"
          onPress={() => navigation.goBack()}
        >
          <ChevronIcon direction="left" styleName="h-5 w-5 text-blue-600" />
          <Text className="w-min text-blue-600">Back</Text>
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

      <View className="mt-8 flex items-center">
        <View className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-gray-700 bg-gray-800">
          <Controller
            control={control}
            name="imageUrl"
            render={({ field: { onChange, value, onBlur } }) => (
              <TouchableOpacity
                onBlur={onBlur}
                className="flex h-full w-full items-center justify-center"
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
        <Text className="ml-2 mt-1 text-center text-xs text-red-600">
          {errors.imageUrl.message}
        </Text>
      )}

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value, ...rest } }) => (
          <TextField
            {...rest}
            placeholder="John Doe"
            label="Full name *"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && (
        <Text className="ml-2 mt-1 text-xs text-red-600">
          {errors.name.message}
        </Text>
      )}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, ...rest } }) => (
          <TextField
            {...rest}
            placeholder="john@gmail.com"
            label="Email *"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && (
        <Text className="ml-2 mt-1 text-xs text-red-600">
          {errors.email.message}
        </Text>
      )}

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value, ...rest } }) => (
          <View className="mt-4">
            <Text className="ml-2 text-xs text-gray-400">Phone *</Text>
            <View className="mt-1 flex flex-row items-center rounded-lg border-2 border-gray-700 bg-gray-800 py-3">
              <Text className="pl-4 text-gray-300">+63</Text>
              <TextInput
                {...rest}
                maxLength={10}
                keyboardType="numeric"
                placeholderTextColor="#71717a"
                className="flex-1 pl-1 pr-4 text-white"
                value={value}
                onChangeText={onChange}
              />
            </View>
          </View>
        )}
      />
      {errors.phone && (
        <Text className="ml-2 mt-1 text-xs text-red-600">
          {errors.phone.message}
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
        <Text className="ml-2 mt-1 text-xs text-red-600">
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
        <Text className="ml-2 mt-1 text-xs text-red-600">
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
            callback={(e) => {
              if (e) onChange(e.uri);
            }}
          />
        )}
      />
      {errors.licenseUrl && (
        <Text className="ml-2 mt-1 text-xs text-red-600">
          {errors.licenseUrl.message}
        </Text>
      )}

      <TouchableOpacity
        className="mt-6 self-end rounded-lg border-2 border-green-500 bg-green-600 px-8 py-2 disabled:opacity-50"
        disabled={isLoading}
        onPress={() => {
          try {
            handleSubmit(
              async ({
                licenseUrl,
                imageUrl,
                confirmPassword,
                phone,
                ...rest
              }) => {
                const [licenseDownloadUrl, imageDownloadUrl] =
                  await Promise.all([
                    uploadFile(licenseUrl, rest.email),
                    uploadFile(imageUrl, rest.email),
                  ]);

                const user = await register.mutateAsync({
                  ...rest,
                  licenseUrl: licenseDownloadUrl,
                  imageUrl: imageDownloadUrl,
                  phone: `+63${phone}`,
                });

                await sendVerification.mutateAsync({ uid: user.user.id });

                await login(rest.email, rest.password);
              }
            )();
          } catch (err: any) {
            Logger.log(err);
            Alert.alert(
              "Register Error",
              err.message ? err.message : JSON.stringify(err, null, 2)
            );
          }
        }}
      >
        <Text className="text-white">
          {isLoading ? "Loading..." : "Register"}
        </Text>
      </TouchableOpacity>
    </Layout>
  );
};
