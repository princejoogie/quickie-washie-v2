import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, Alert } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { ImageInput, Layout, TextField } from "../../../components";
import { useAuthContext } from "../../../contexts/auth-context";
import { queryClient } from "../../../services/api";
import authService from "../../../services/auth";
import { DashboardParamList } from "../types";

export const Profile = ({}: BottomTabScreenProps<
  DashboardParamList,
  "Profile"
>) => {
  const { data } = useAuthContext();

  const logout = useMutation(authService.logout, {
    onSettled() {
      queryClient.invalidateQueries(["profile"]);
    },
  });

  return (
    <Layout
      className="p-6"
      nav={{
        title: "Profile",
        actions: (
          <TouchableOpacity
            disabled={logout.isLoading}
            onPress={async () => {
              try {
                await logout.mutateAsync();
              } catch (error) {
                Alert.alert("Error", "Invalid email or password");
                console.log(error);
              }
            }}
          >
            <Text className="text-red-600">Logout</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <TextField
        editable={false}
        containerClassname=""
        label="Full name *"
        value={data?.name}
      />
      <TextField
        editable={false}
        keyboardType="email-address"
        label="Email *"
        value={data?.email}
      />

      <ImageInput label="Drivers license *" uri={null} callback={() => {}} />
    </Layout>
  );
};
