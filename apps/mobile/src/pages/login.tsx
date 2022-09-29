import { View, Text, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Layout, TextField } from "../components";

import { RootStackParamList } from "./types";
import { handleError } from "../utils/helpers";
import { useAuthContext } from "../contexts/auth-context";
import { LoginCar } from "../components/icon/login-car";

const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export const Login = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Login">) => {
  const { login } = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<LoginSchema>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = isSubmitting || isValidating;

  return (
    <Layout className="px-6">
      <View className="mt-4">
        <Text className="w-full text-2xl font-bold text-white">
          Login to Quickie Washie
        </Text>
        <Text className="mt-1 text-gray-400">Hello, welcome back!</Text>
      </View>

      <LoginCar styleName="mx-auto my-14" />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, ...rest } }) => (
          <TextField
            {...rest}
            label="Email"
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

      <TouchableOpacity
        className={`mt-6 self-end rounded-lg border-2 border-green-500 bg-green-600 px-8 py-2 ${
          isLoading ? "opacity-50" : "opacity-100"
        }`}
        disabled={isLoading}
        onPress={handleSubmit(async ({ email, password }) => {
          try {
            await login(email, password);
          } catch (e) {
            const err = handleError(e);
            Alert.alert("Error", err.message);
          }
        })}
      >
        <Text className="text-white">{isLoading ? "Loading..." : "Login"}</Text>
      </TouchableOpacity>

      <View className="mt-2 self-end">
        <Text className="text-xs text-white">Not registered yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-xs text-blue-600">Create an account</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};
