import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Layout, TextField } from "../components";
import authService from "../services/auth";
import { queryClient } from "../services/api";

import { RootStackParamList } from "./types";
import { handleError } from "../utils/helpers";

export const Login = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Login">) => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("qweqwe");

  const login = useMutation(authService.login, {
    onSuccess() {
      queryClient.invalidateQueries(["profile"]);
    },
  });

  return (
    <Layout className="px-6">
      <View className="mt-4">
        <Text className="w-full text-2xl font-bold text-white">
          Login to Quickie Washie
        </Text>
        <Text className="mt-1 text-gray-400">Hello, welcome back!</Text>
      </View>

      <TextField
        keyboardType="email-address"
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextField
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="bg-green-600 self-end mt-6 px-8 py-2 rounded-lg border-2 border-green-500 disabled:opacity-50"
        disabled={login.isLoading}
        onPress={async () => {
          try {
            await login.mutateAsync({ email, password });
          } catch (e) {
            const err = handleError(e);
            Alert.alert("Error", err.message);
          }
        }}
      >
        <Text className="text-white">Login</Text>
      </TouchableOpacity>

      <View className="self-end mt-2">
        <Text className="text-white">Not registered yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-blue-600">Create an account</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};
