import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { VehiclesStackParamList } from "./types";

import { Layout } from "../../../components";

export const VehicleDetails = ({
  route,
  navigation,
}: NativeStackScreenProps<VehiclesStackParamList, "VehicleDetails">) => {
  const props = route.params;

  return (
    <Layout
      nav={{
        title: props.plateNumber,
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
      }}
    >
      <View className="flex flex-1 items-center justify-center">
        <Text className="text-white">
          Vehicle {JSON.stringify(props, null, 2)}
        </Text>
      </View>
    </Layout>
  );
};
