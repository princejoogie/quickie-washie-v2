import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { VehiclesStackParamList } from "./types";

import { Layout } from "../../../components";

export const NewVehicle = ({
  navigation,
}: NativeStackScreenProps<VehiclesStackParamList, "NewVehicle">) => {
  return (
    <Layout
      nav={{
        title: "New Vehicle",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
      }}
    >
      <View className="flex flex-1 items-center justify-center">
        <Text className="text-white">New Vehicle</Text>
      </View>
    </Layout>
  );
};
