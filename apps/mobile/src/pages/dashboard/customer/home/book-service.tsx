import { Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Layout, TextField } from "../../../../components";
import servicesService from "../../../../services/services";

import { HomeStackParamList } from "./types";
import vehiclesService from "../../../../services/vehicles";
import { useState } from "react";

export const BookService = ({
  route,
  navigation,
}: NativeStackScreenProps<HomeStackParamList, "BookService">) => {
  const props = route.params;
  const [vehicleId, setVehicleId] = useState("");

  const serviceDetails = useQuery(["serviceDetails", props.serviceId], (e) =>
    servicesService.getById({ serviceId: e.queryKey[1] })
  );

  const vehicles = useQuery(["vehicles"], vehiclesService.getAll, {
    onSuccess: (data) => {
      if (data.length > 0) {
        setVehicleId(data[0].id);
      }
    },
  });

  const getAdditionalPrice = () => {
    if (vehicles.data && serviceDetails.data) {
      const vehicle = vehicles.data.find((e) => e.id === vehicleId);
      if (vehicle) {
        const additionalPrice = serviceDetails.data.additionalPrices.find(
          (e) => e.vehicleType === vehicle.type
        );

        if (additionalPrice) {
          return additionalPrice.price.toString();
        }
      }
    }

    return "0.00";
  };

  return (
    <Layout
      nav={{
        title: "Book Service",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
      }}
    >
      <TextField
        multiline
        editable={false}
        label="Service Name"
        value={serviceDetails.data?.name}
      />

      <TextField
        multiline
        editable={false}
        label="Description"
        value={serviceDetails.data?.description}
      />

      <TextField
        editable={false}
        label="Base price"
        value={`₱ ${serviceDetails.data?.basePrice.toString() ?? "0.00"}`}
      />

      <Text className="text-gray-400 text-xs ml-2 mt-4">Select vehicle</Text>
      {vehicles.data && vehicles.data.length > 0 && (
        <Picker
          itemStyle={{ color: "white" }}
          mode="dialog"
          selectedValue={vehicleId}
          onValueChange={(e) => {
            setVehicleId(e);
          }}
        >
          {vehicles.data.map((e) => (
            <Picker.Item key={e.id} label={e.plateNumber} value={e.id} />
          ))}
        </Picker>
      )}

      <TextField
        editable={false}
        label="Additional price"
        value={`₱ ${getAdditionalPrice()}`}
      />

      <Text className="text-gray-400 text-xs ml-2 mt-4">Select date</Text>
    </Layout>
  );
};
