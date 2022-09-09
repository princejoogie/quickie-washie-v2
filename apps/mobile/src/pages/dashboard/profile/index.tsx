import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, Alert } from "react-native";
import { useMutation } from "react-query";
import { Layout } from "../../../components";
import { queryClient } from "../../../services/api";
import authService from "../../../services/auth";
import { DashboardParamList } from "../types";

export const Profile = ({}: BottomTabScreenProps<
  DashboardParamList,
  "Profile"
>) => {
  const logout = useMutation(authService.logout, {
    onSettled() {
      queryClient.invalidateQueries(["profile"]);
    },
  });

  return (
    <Layout className="p-6">
      <Text className="text-white w-full text-xl text-center">Profile</Text>

      <TouchableOpacity
        className="bg-gray-700 mt-2 self-start rounded px-4 py-2"
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
        <Text className="text-white">Logout</Text>
      </TouchableOpacity>
    </Layout>
  );
};
