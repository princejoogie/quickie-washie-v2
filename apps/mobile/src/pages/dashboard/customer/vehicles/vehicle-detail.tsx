import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { VehiclesStackParamList } from "./types";

import vehiclesService from "../../../../services/vehicles";
import { VehicleTypeNames } from "../../../../constants";
import { AppointmentCard, Layout, TextField } from "../../../../components";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CustomerDashboardParamList } from "../types";

export const VehicleDetail = ({
  route,
  navigation,
}: NativeStackScreenProps<VehiclesStackParamList, "VehicleDetail">) => {
  const { vehicleId } = route.params;

  const [isEditing, setIsEditing] = useState(false);
  const [plateNumber, setPlateNumber] = useState("");
  const [type, setType] = useState("");
  const [model, setModel] = useState("");

  const vehicleDetails = useQuery(
    ["vehicle", vehicleId],
    (e) => vehiclesService.getById({ vehicleId: e.queryKey[1] }),
    {
      onSuccess: (data) => {
        setPlateNumber(data.plateNumber);
        setType(data.type);
        setModel(data.model);
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
        navigation.goBack();
      }
    },
  });

  return (
    <Layout
      onRefresh={vehicleDetails.refetch}
      nav={{
        title: vehicleDetails.data?.id ?? "Vehicle Details",
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
                    vehicleId,
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
          style={{ color: "white" }}
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

      <View className="w-full">
        {vehicleDetails.data && vehicleDetails.data.appointments.length > 0 ? (
          vehicleDetails.data.appointments.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              onClick={() => {
                navigation
                  .getParent<
                    BottomTabNavigationProp<
                      CustomerDashboardParamList,
                      "Appointments"
                    >
                  >()
                  .navigate("Appointments");
              }}
            />
          ))
        ) : (
          <Text className="text-gray-600 text-xs ml-2 mt-2">
            No appointments
          </Text>
        )}
      </View>

      <TouchableOpacity
        className="self-end mt-6"
        disabled={deleteVehicle.isLoading}
        onPress={() => {
          deleteVehicle.mutateAsync({ vehicleId });
        }}
      >
        <Text className="text-red-600">Delete Vehicle</Text>
      </TouchableOpacity>
    </Layout>
  );
};
