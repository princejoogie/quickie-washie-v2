import { View, Text, TouchableOpacity } from "react-native";
import { useQuery } from "react-query";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { VehiclesStack, VehiclesStackParamList } from "./types";
import { NewVehicle } from "./new-vehicle";
import { VehicleDetails } from "./vehicle-details";

import { DashboardParamList } from "../types";

import { Layout, VehicleCard } from "../../../components";
import vehiclesService from "../../../services/vehicles";
import { PlusIcon } from "../../../components/icon/plus-icon";

export const Vehicles = ({}: BottomTabScreenProps<
  DashboardParamList,
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
      <VehiclesStack.Screen name="VehicleDetails" component={VehicleDetails} />
    </VehiclesStack.Navigator>
  );
};

const AllVehicles = ({
  navigation,
}: NativeStackScreenProps<VehiclesStackParamList, "AllVehicles">) => {
  const vehicles = useQuery("vehicles", vehiclesService.getAll);

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
        <Text>Loading...</Text>
      ) : (
        <View>
          {vehicles.data?.map((vehicle) => (
            <VehicleCard
              {...vehicle}
              key={vehicle.id}
              navigation={navigation}
            />
          ))}
        </View>
      )}
    </Layout>
  );
};
