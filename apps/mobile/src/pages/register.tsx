import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Layout, TextField, ImageInput } from "../components";
import { RootStackParamList } from "./types";
import { ChevronIcon } from "../components/icon/chevron-icon";
import { getImage } from "../utils/helpers";

export const Register = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Register">) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [licenseUrl, setLicenseUrl] = useState<string | null>(null);

  return (
    <Layout>
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

      <View className="flex items-center mt-8">
        <View>
          <TouchableOpacity
            onPress={async () => {
              const res = await getImage();
              if (res) setImageUrl(res);
            }}
          >
            <Image
              className="bg-gray-800 h-32 w-32 border-2 border-gray-700 rounded-full"
              source={{ uri: !imageUrl ? undefined : imageUrl }}
            />
          </TouchableOpacity>
        </View>
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
      <TextField
        label="Confirm password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <ImageInput
        label="Drivers license"
        uri={!licenseUrl ? undefined : licenseUrl}
        callback={(uri) => {
          console.log({ uri });
          setLicenseUrl(uri);
        }}
      />
    </Layout>
  );
};
