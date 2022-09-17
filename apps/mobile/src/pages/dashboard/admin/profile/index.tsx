import { Image, Text, TouchableOpacity } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { ImageInput, Layout, TextField } from "../../../../components";
import { useAuthContext } from "../../../../contexts/auth-context";
import authService from "../../../../services/auth";

import { AdminDashboardParamList } from "../types";

export const Profile = ({}: BottomTabScreenProps<
  AdminDashboardParamList,
  "Profile"
>) => {
  const { logout } = useAuthContext();
  const profile = useQuery(["profile"], authService.profile);
  const isFocused = useIsFocused();

  if (isFocused && profile.isStale) {
    profile.refetch();
  }

  return (
    <Layout
      className="p-6"
      nav={{
        title: "Profile",
        actions: (
          <TouchableOpacity onPress={logout}>
            <Text className="text-red-600">Logout</Text>
          </TouchableOpacity>
        ),
      }}
      onRefresh={profile.refetch}
    >
      <Image
        className="mx-auto h-32 w-32 rounded-full"
        source={{ uri: profile.data?.photoUrl ?? undefined }}
      />

      <TextField
        editable={false}
        containerClassname=""
        label="Full name"
        value={profile.data?.name}
      />
      <TextField
        editable={false}
        keyboardType="email-address"
        label="Email"
        value={profile.data?.email}
      />

      <ImageInput
        label="Drivers license"
        uri={profile.data?.licenseUrl ?? null}
        callback={() => {}}
      />
    </Layout>
  );
};
