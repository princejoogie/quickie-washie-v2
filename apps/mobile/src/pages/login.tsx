import { useState } from "react";
import { useMutation } from "react-query";
import { Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RootStackParamList } from "./types";
import authService from "../services/auth";
import { Layout } from "../components";

export const Login = ({}: NativeStackScreenProps<
  RootStackParamList,
  "Login"
>) => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("qweqwe");
  const [tokens, setTokens] = useState<any>(null);

  const login = useMutation(authService.login);
  const refresh = useMutation(authService.refreshToken);

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
        onPress={async () => {
          try {
            const res = await login.mutateAsync({ email, password });
            Alert.alert("Success", JSON.stringify(res));
          } catch (error) {
            Alert.alert("Error", "Invalid email or password");
            console.log(error);
          }
        }}
      >
        <Text className="text-white">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-gray-700 mt-2 self-start rounded px-4 py-2"
        onPress={async () => {
          try {
            const res = await refresh.mutateAsync({
              refreshToken: tokens.refreshToken ?? "",
            });
            Alert.alert("Success", JSON.stringify(res));
          } catch (error) {
            Alert.alert("Error", "Invalid email or password");
            console.log(error);
          }
        }}
      >
        <Text className="text-white">Refresh token</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-gray-700 mt-2 self-start rounded px-4 py-2"
        onPress={async () => {
          try {
            const accessToken = await AsyncStorage.getItem("accessToken");
            const refreshToken = await AsyncStorage.getItem("refreshToken");
            setTokens({ accessToken, refreshToken });
          } catch (error) {
            Alert.alert("Error", "Invalid email or password");
            console.log(error);
          }
        }}
      >
        <Text className="text-white">Retrieve tokens</Text>
      </TouchableOpacity>

      <Text className="text-white mt-6">{JSON.stringify(tokens)}</Text>
    </Layout>
  );
};
