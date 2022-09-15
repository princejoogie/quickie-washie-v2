import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity } from "react-native";
import { ImageInput, Layout, TextField } from "../../../../components";
import { useAuthContext } from "../../../../contexts/auth-context";
import { CustomerDashboardParamList } from "../types";

export const Profile = ({}: BottomTabScreenProps<
  CustomerDashboardParamList,
  "Profile"
>) => {
  const { data, logout } = useAuthContext();

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
