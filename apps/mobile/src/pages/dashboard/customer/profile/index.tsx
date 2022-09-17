import { Text, TouchableOpacity } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { ImageInput, Layout, TextField } from "../../../../components";
import { useAuthContext } from "../../../../contexts/auth-context";
import authService from "../../../../services/auth";

import { CustomerDashboardParamList } from "../types";

export const Profile = ({}: BottomTabScreenProps<
  CustomerDashboardParamList,
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
      <TextField
        editable={false}
        containerClassname=""
        label="Full name *"
        value={profile.data?.name}
      />
      <TextField
        editable={false}
        keyboardType="email-address"
        label="Email *"
        value={profile.data?.email}
      />

      <ImageInput label="Drivers license *" uri={null} callback={() => {}} />
    </Layout>
  );
};
