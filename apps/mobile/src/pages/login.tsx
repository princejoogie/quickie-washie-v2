import { useState } from "react";
import { Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";
import { Layout } from "../components";
import { useMutation } from "react-query";
import authService from "../services/auth";
import { queryClient } from "../services/api";
import { useAuthContext } from "../contexts/auth-context";

export const Login = ({}: NativeStackScreenProps<
  RootStackParamList,
  "Login"
>) => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("qweqwe");
  const { data } = useAuthContext();

  const login = useMutation(authService.login, {
    onSettled() {
      queryClient.invalidateQueries(["profile"]);
    },
  });

  const logout = useMutation(authService.logout, {
    onSettled() {
      queryClient.invalidateQueries(["profile"]);
    },
  });

  return (
    <Layout className="justify-center px-6">
      <Text className="w-full text-2xl font-bold text-white">
        Welcome to the app!
      </Text>

      {!data ? (
        <>
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
        </>
      ) : (
        <>
          <Text className="text-white">{JSON.stringify(data, null, 2)}</Text>

          <TouchableOpacity
            className="bg-gray-700 mt-2 self-start rounded px-4 py-2"
            disabled={login.isLoading}
            onPress={async () => {
              try {
                await logout.mutateAsync();
              } catch (error) {
                Alert.alert("Error", "Invalid email or password");
                console.log(error);
              }
            }}
          >
            <Text className="text-white">Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </Layout>
  );
};
