import { useState } from "react";
import { useMutation } from "react-query";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Layout, TextField } from "../components";
import authService from "../services/auth";
import { queryClient } from "../services/api";

import { RootStackParamList } from "./types";

export const Login = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Login">) => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("qweqwe");

  const login = useMutation(authService.login, {
    onSettled() {
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

      <TextField placeholder="Email" value={email} onChangeText={setEmail} />
      <TextField
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
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

      <View>
        <Text className="text-white">Not registered yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-blue-600">Create an account</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};
