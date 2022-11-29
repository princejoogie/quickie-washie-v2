import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { TouchableOpacity, Text, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AdminProfileStackParamList } from "./types";
import { Layout, TextField } from "../../../../components";
import authService from "../../../../services/auth";

export const ChangePassword = ({
  navigation,
}: NativeStackScreenProps<AdminProfileStackParamList, "ChangePassword">) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = useMutation(authService.changePassword, {
    onSuccess: () => {
      Alert.alert("Success", "Password changed successfully");
      navigation.goBack();
    },
  });

  return (
    <Layout
      nav={{
        title: "Change Password",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
      }}
    >
      <TextField
        label="Current password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      <TextField
        label="New password"
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TouchableOpacity
        disabled={changePassword.isLoading}
        onPress={() => {
          changePassword.mutate({
            password: currentPassword,
            newPassword,
          });
        }}
        className={`mt-6 self-end rounded-lg border-2 border-green-500 bg-green-600 px-8 py-2 ${
          changePassword.isLoading ? "opacity-50" : "opacity-100"
        }`}
      >
        <Text className="text-center text-white">
          {changePassword.isLoading ? "Loading..." : "Change password"}
        </Text>
      </TouchableOpacity>
    </Layout>
  );
};

/* Alert.prompt("Current password", "", async (currentPassword) => { */
/*   Alert.prompt("New password", "", async (newPassword) => { */
/*     try { */
/*       await authService.changePassword({ */
/*         password: currentPassword, */
/*         newPassword, */
/*       }); */
/*       Alert.alert("Password changed successfully"); */
/*     } catch { */
/*       Alert.alert("Invalid password"); */
/*     } */
/*   }); */
/* }); */
