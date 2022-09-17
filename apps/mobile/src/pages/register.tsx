import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import authService from "../services/auth";
import { ChevronIcon } from "../components/icon/chevron-icon";
import { Layout, TextField, ImageInput } from "../components";
import { PencilSquareIcon } from "../components/icon/pencil-square-icon";
import { getImage } from "../utils/helpers";

import { RootStackParamList } from "./types";
import { useAuthContext } from "../contexts/auth-context";
import { uploadImage } from "../services/firebase";

export const Register = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Register">) => {
  const { login } = useAuthContext();
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@gmail.com");
  const [password, setPassword] = useState("qweqwe");
  const [confirmPassword, setConfirmPassword] = useState("qweqwe");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [licenseUrl, setLicenseUrl] = useState<string | null>(null);

  const register = useMutation(authService.register, {
    onSuccess: async () => {
      await login(email, password);
    },
  });

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
        <View className="bg-gray-800 h-32 w-32 border-2 border-gray-700 rounded-full flex items-center justify-center">
          <TouchableOpacity
            className="w-full h-full flex items-center justify-center"
            onPress={async () => {
              const res = await getImage({ aspect: [1, 1] });
              if (res) setImageUrl(res.uri);
            }}
          >
            {!imageUrl ? (
              <PencilSquareIcon styleName="text-blue-600" />
            ) : (
              <Image
                className="h-full w-full rounded-full"
                source={{ uri: imageUrl }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TextField label="Full name *" value={name} onChangeText={setName} />
      <TextField
        keyboardType="email-address"
        label="Email *"
        value={email}
        onChangeText={setEmail}
      />
      <TextField
        label="Password *"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextField
        label="Confirm password *"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <ImageInput
        label="Drivers license *"
        uri={licenseUrl}
        callback={async (e) => {
          if (e?.uri) {
            setLicenseUrl(e.uri);
          }
        }}
      />

      <TouchableOpacity
        className="bg-green-600 self-end mt-6 px-8 py-2 rounded-lg border-2 border-green-500 disabled:opacity-50"
        disabled={register.isLoading}
        onPress={async () => {
          if (licenseUrl && imageUrl) {
            const licenseDownloadUrl = await uploadImage(
              licenseUrl,
              (progress) => {
                console.log(`${progress}%`);
              }
            );
            const imageDownloadUrl = await uploadImage(imageUrl, (progress) => {
              console.log(`${progress}%`);
            });

            await register.mutateAsync({
              email,
              name,
              password,
              licenseUrl: licenseDownloadUrl,
              imageUrl: imageDownloadUrl,
            });
          }
        }}
      >
        <Text className="text-white">
          {register.isLoading ? "Loading..." : "Register"}
        </Text>
      </TouchableOpacity>
    </Layout>
  );
};
