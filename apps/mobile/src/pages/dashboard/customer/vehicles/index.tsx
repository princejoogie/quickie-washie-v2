import { Text, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";

import { VehiclesStack, VehiclesStackParamList } from "./types";
import { NewVehicle } from "./new-vehicle";
import { VehicleDetail } from "./vehicle-detail";

import { CustomerDashboardParamList } from "../types";

import { Layout, LoadingText, VehicleCard } from "../../../../components";
import vehiclesService from "../../../../services/vehicles";
import { PlusIcon } from "../../../../components/icon/plus-icon";

export const Vehicles = ({}: BottomTabScreenProps<
  CustomerDashboardParamList,
  "Vehicles"
>) => {
  return (
    <VehiclesStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#111827",
        },
      }}
      initialRouteName="AllVehicles"
    >
      <VehiclesStack.Screen name="AllVehicles" component={AllVehicles} />
      <VehiclesStack.Screen name="NewVehicle" component={NewVehicle} />
      <VehiclesStack.Screen name="VehicleDetail" component={VehicleDetail} />
    </VehiclesStack.Navigator>
  );
};

const AllVehicles = ({
  navigation,
}: NativeStackScreenProps<VehiclesStackParamList, "AllVehicles">) => {
  const vehicles = useQuery(["vehicles"], vehiclesService.getAll);
  const isFocused = useIsFocused();

  if (isFocused && vehicles.isStale) {
    vehicles.refetch();
  }

  return (
    <Layout
      onRefresh={vehicles.refetch}
      nav={{
        title: "Vehicles",
        actions: (
          <TouchableOpacity
            className="flex flex-row items-center"
            onPress={() => {
              navigation.navigate("NewVehicle");
            }}
          >
            <PlusIcon />
          </TouchableOpacity>
        ),
      }}
    >
      {vehicles.isLoading ? (
        <LoadingText />
      ) : vehicles.data && vehicles.data.length > 0 ? (
        vehicles.data?.map((vehicle) => (
          <VehicleCard
            vehicle={vehicle}
            key={vehicle.id}
            onClick={() => {
              navigation.navigate("VehicleDetail", { vehicleId: vehicle.id });
            }}
          />
        ))
      ) : (
        <Text className="mt-4 text-center text-xs text-gray-400">
          No vehicles available.
        </Text>
      )}
    </Layout>
  );
};
