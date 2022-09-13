import { View, Text } from "react-native";
import { useQuery } from "react-query";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Layout } from "../../../components";
import vehiclesService from "../../../services/vehicles";
import { DashboardParamList } from "../types";

export const Vehicles = ({}: BottomTabScreenProps<
  DashboardParamList,
  "Vehicles"
>) => {
  const vehicles = useQuery("vehicles", vehiclesService.getAll);

  return (
    <Layout nav={{ title: "Vehicles" }} onRefresh={vehicles.refetch}>
      {vehicles.isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          {vehicles.data?.map((vehicle) => (
            <Text key={vehicle.id} className="text-white">
              {vehicle.plateNumber} - {vehicle.type} - {vehicle.model}
            </Text>
          ))}
        </View>
      )}
    </Layout>
  );
};
