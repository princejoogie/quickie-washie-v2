import { View, Text, TouchableOpacity } from "react-native";
import { GetAllVehiclesResponse } from "@qw/dto";

export const VehicleCard = ({
  model,
  type,
  plateNumber,
}: GetAllVehiclesResponse[number]) => {
  return (
    <TouchableOpacity className="border-gray-700 bg-gray-800 mt-3 rounded-lg border-2 p-1">
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center p-2">
          <View className="h-12 w-12 rounded-full bg-pink-600 mr-2" />
          <View>
            <Text className="text-lg text-gray-200 font-bold">
              {plateNumber}
            </Text>
            <Text className="text-gray-400 text-xs">{model}</Text>
          </View>
        </View>

        <View className="self-start bg-blue-600 border border-blue-500 rounded px-2">
          <Text className="text-white text-xs">{type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
