import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { Layout } from "../components";

export const Login = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Login">) => {
  const [username, setUsername] = useState("joogie");

  return (
    <Layout className="justify-center px-6">
      <Text className="w-full text-2xl font-bold text-white">
        Welcome to the app!
      </Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        className="border-gray-700 mt-6 rounded border-2 px-4 py-3 text-white"
      />

      <TouchableOpacity
        className="bg-gray-700 mt-2 self-start rounded px-4 py-2"
        onPress={() => navigation.push("Home", { username })}
      >
        <Text className="text-white">Login</Text>
      </TouchableOpacity>
    </Layout>
  );
};
