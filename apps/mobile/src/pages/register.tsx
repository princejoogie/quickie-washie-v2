import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, TextField } from "../components";
import { RootStackParamList } from "./types";
import { ChevronIcon } from "../components/icon/chevron-icon";

export const Register = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Register">) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Layout className="px-6">
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

      <TextField placeholder="Email" value={email} onChangeText={setEmail} />
      <TextField
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextField
        placeholder="Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
    </Layout>
  );
};
