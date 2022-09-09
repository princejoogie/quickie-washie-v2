import { useState } from "react";
import { useMutation } from "react-query";
import { Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Layout } from "../components";
import authService from "../services/auth";
import { queryClient } from "../services/api";

import { RootStackParamList } from "./types";

export const Login = ({}: NativeStackScreenProps<
  RootStackParamList,
  "Login"
>) => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("qweqwe");

  const login = useMutation(authService.login, {
    onSettled() {
      queryClient.invalidateQueries(["profile"]);
    },
  });

  return (
    <Layout className="justify-center px-6">
      <Text className="w-full text-2xl font-bold text-white">
        Welcome to the app!
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border-gray-700 mt-6 rounded border-2 px-4 py-3 text-white"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="border-gray-700 mt-6 rounded border-2 px-4 py-3 text-white"
      />
      <TouchableOpacity
        className="bg-gray-700 mt-2 self-start rounded px-4 py-2"
        disabled={login.isLoading}
        onPress={async () => {
          try {
            await login.mutateAsync({ email, password });
          } catch (error) {
            Alert.alert("Error", "Invalid email or password");
            console.log(error);
          }
        }}
      >
        <Text className="text-white">Login</Text>
      </TouchableOpacity>
    </Layout>
  );
};
