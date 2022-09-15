import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { GetVehicleByIdResponse } from "@qw/dto";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { VehiclesStackParamList } from "./types";

import { Layout, TextField } from "../../../components";
import vehiclesService from "../../../services/vehicles";
import { queryClient } from "../../../services/api";
import { IVehicleType, VehicleTypeNames } from "../../../constants";

export const VehicleDetails = ({
  route,
  navigation,
}: NativeStackScreenProps<VehiclesStackParamList, "VehicleDetails">) => {
  const props = route.params;

  const [isEditing, setIsEditing] = useState(false);
  const [plateNumber, setPlateNumber] = useState(props.plateNumber);
  const [type, setType] = useState<IVehicleType>(props.type);
  const [model, setModel] = useState(props.model);
  const [appointments, setAppointments] = useState<
    GetVehicleByIdResponse["appointments"]
  >([]);

  const vehicleDetails = useQuery(
    ["vehicle", props.id],
    (e) => vehiclesService.getById({ vehicleId: e.queryKey[1] }),
    {
      onSuccess: (data) => {
        setPlateNumber(data.plateNumber);
        setType(data.type);
        setModel(data.model);
        setAppointments(data.appointments);
      },
    }
  );

  const updateVehicle = useMutation(vehiclesService.update, {
    onSuccess: (data) => {
      setPlateNumber(data.plateNumber);
      setType(data.type);
      setModel(data.model);
    },
  });

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
      onRefresh={vehicleDetails.refetch}
      nav={{
        title: props.plateNumber,
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
        actions: (
          <TouchableOpacity
            className="flex flex-row items-center"
            onPress={async () => {
              if (isEditing) {
                await updateVehicle.mutateAsync({
                  body: {
                    model,
                    plateNumber,
                    type,
                  },
                  params: {
                    vehicleId: props.id,
                  },
                });
                setIsEditing(false);
                Keyboard.dismiss();
              } else {
                setIsEditing(true);
              }
            }}
          >
            <Text className="text-blue-600 font-bold">
              {isEditing ? "Save" : "Edit"}
            </Text>
          </TouchableOpacity>
        ),
      }}
    >
      <TextField
        placeholder="ABC-123"
        maxLength={10}
        label="Plate Number"
        value={plateNumber}
        editable={isEditing}
        onChangeText={(e) => {
          setPlateNumber(e.toUpperCase());
        }}
      />

      <TextField
        placeholder="Audi A3 2022"
        maxLength={50}
        label="Model"
        value={model}
        editable={isEditing}
        onChangeText={setModel}
      />

      <Text className="text-gray-400 text-xs ml-2 mt-4">Vehicle Type</Text>
      <View
        pointerEvents={isEditing ? "auto" : "none"}
        className={`${isEditing ? "opacity-100" : "opacity-60"}`}
      >
        <Picker
          itemStyle={{ color: "white" }}
          selectedValue={type}
          enabled={isEditing}
          onValueChange={(e) => {
            setType(e);
          }}
        >
          {Object.entries(VehicleTypeNames).map(([key, value]) => (
            <Picker.Item key={key} label={value} value={key} />
          ))}
        </Picker>
      </View>

      <Text className="text-gray-400 text-xs ml-2 mt-4">Appointments</Text>

      <View>
        <Text className="text-gray-600 text-xs ml-2 mt-2">
          {JSON.stringify(appointments, null, 2)}
        </Text>
      </View>

      <TouchableOpacity
        className="self-end"
        disabled={deleteVehicle.isLoading}
        onPress={() => {
          deleteVehicle.mutateAsync({ vehicleId: props.id });
        }}
      >
        <Text className="text-red-600">Delete Vehicle</Text>
      </TouchableOpacity>
    </Layout>
  );
};
