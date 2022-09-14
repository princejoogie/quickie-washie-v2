import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { VehiclesStackParamList } from "./types";

import { Layout } from "../../../components";
import vehiclesService from "../../../services/vehicles";
import { handleError } from "../../../utils/helpers";
import { queryClient } from "../../../services/api";

export const VehicleDetails = ({
  route,
  navigation,
}: NativeStackScreenProps<VehiclesStackParamList, "VehicleDetails">) => {
  const props = route.params;
  const deleteVehicle = useMutation(vehiclesService.deleteVehicle, {
    onSuccess: () => {
      if (navigation.canGoBack()) {
        queryClient.invalidateQueries(["vehicles"]);
        navigation.goBack();
      }
    },
  });

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

      <TouchableOpacity
        disabled={deleteVehicle.isLoading}
        onPress={async () => {
          try {
            await deleteVehicle.mutateAsync({ vehicleId: props.id });
          } catch (e) {
            const err = handleError(e);
            Alert.alert("Error", err.message);
          }
        }}
      >
        <Text className="text-red-600">Delete</Text>
      </TouchableOpacity>
    </Layout>
  );
};
