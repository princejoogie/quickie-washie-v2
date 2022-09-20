import { View, Text, TouchableOpacity } from "react-native";

interface VehicleCardProps {
  onClick?: () => void;
  vehicle?: {
    plateNumber: string;
    model: string;
    type: string;
    id: string;
  };
}

export const VehicleCard = ({ onClick, vehicle }: VehicleCardProps) => {
  if (!vehicle?.id) {
    return (
      <View className="border-gray-700 bg-gray-800 mt-3 rounded-lg border-2 relative">
        <View className="flex flex-row items-center p-3">
          <Text className="text-gray-400 text-xs">Unknown vehicle</Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      className="border-gray-700 bg-gray-800 mt-3 rounded-lg border-2 relative"
      disabled={!onClick}
      onPress={() => {
        if (onClick) onClick();
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
            {vehicle?.plateNumber}
          </Text>

          <Text
            style={{ flex: 1 }}
            className="text-gray-400 text-xs"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {vehicle?.model}
          </Text>
        </View>
      </View>

      <View className="bg-blue-600 border border-blue-500 rounded px-2 absolute top-1 right-1">
        <Text className="text-white text-xs">{vehicle?.type}</Text>
      </View>
    </TouchableOpacity>
  );
};
