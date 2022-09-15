import { View, Text, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GetAllVehiclesResponse } from "@qw/dto";
import { VehiclesStackParamList } from "../pages/dashboard/customer/vehicles/types";

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
      className="border-gray-700 bg-gray-800 mt-3 rounded-lg border-2 relative"
      onPress={() => {
        navigation.navigate("VehicleDetail", props);
      }}
    >
      <View className="flex flex-row items-center p-3">
        <View className="h-12 w-12 rounded-full bg-pink-600 mr-2" />

        <View className="flex-1">
          <Text
            style={{ flex: 1 }}
            className="text-lg text-gray-200 font-bold"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {props.plateNumber}
          </Text>

          <Text
            style={{ flex: 1 }}
            className="text-gray-400 text-xs"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {props.model}
          </Text>
        </View>
      </View>

      <View className="bg-blue-600 border border-blue-500 rounded px-2 absolute top-1 right-1">
        <Text className="text-white text-xs">{props.type}</Text>
      </View>
    </TouchableOpacity>
  );
};
