import { View, Text, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GetAllVehiclesResponse } from "@qw/dto";
import { VehiclesStackParamList } from "../pages/dashboard/vehicles/types";

type VehicleCardProps = GetAllVehiclesResponse[number] & {
  navigation: NativeStackNavigationProp<
    VehiclesStackParamList,
    "AllVehicles",
    undefined
  >;
};

export const VehicleCard = ({ navigation, ...props }: VehicleCardProps) => {
  return (
    <TouchableOpacity
      className="border-gray-700 bg-gray-800 mt-3 rounded-lg border-2 p-1"
      onPress={() => {
        navigation.navigate("VehicleDetails", props);
      }}
    >
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center p-2">
          <View className="h-12 w-12 rounded-full bg-pink-600 mr-2" />
          <View>
            <Text className="text-lg text-gray-200 font-bold">
              {props.plateNumber}
            </Text>
            <Text className="text-gray-400 text-xs">{props.model}</Text>
          </View>
        </View>

        <View className="self-start bg-blue-600 border border-blue-500 rounded px-2">
          <Text className="text-white text-xs">{props.type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
