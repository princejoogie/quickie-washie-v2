import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { Layout } from "../components";
import { logOut, signIn } from "../firebase";
import { useAuthContext } from "../contexts/auth-context";
import { api } from "../services/api";

export const Login = ({}: NativeStackScreenProps<
  RootStackParamList,
  "Login"
>) => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("qweqweqwe");

  const { user } = useAuthContext();

  return (
    <Layout className="justify-center px-6">
      <Text className="w-full text-2xl font-bold text-white">
        Welcome to the app! {user?.email}
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
            const res = await api.get("/test");
            Alert.alert("Success", JSON.stringify(res.data));
          } catch (error) {
            const err = error as any;
            Alert.alert("Error", JSON.stringify(err.message));
            console.log(JSON.stringify(error));
          }
        }}
      >
        <Text className="text-white">Test api</Text>
      </TouchableOpacity>

      {!user ? (
        <TouchableOpacity
          className="bg-gray-700 mt-2 self-start rounded px-4 py-2"
          onPress={async () => {
            try {
              await signIn(email, password);
            } catch (error) {
              Alert.alert("Error", "Invalid email or password");
              console.log(error);
            }
          }}
        >
          <Text className="text-white">Sign in</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="bg-gray-700 mt-2 self-start rounded px-4 py-2"
          onPress={async () => {
            try {
              await logOut();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <Text className="text-white">Log out</Text>
        </TouchableOpacity>
      )}
    </Layout>
  );
};
