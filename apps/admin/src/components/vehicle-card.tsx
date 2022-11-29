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
      <View className="relative mt-3 rounded-lg border-2 border-gray-700 bg-gray-800">
        <View className="flex flex-row items-center p-3">
          <Text className="text-xs text-gray-400">Unknown vehicle</Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      className="relative mt-3 rounded-lg border-2 border-gray-700 bg-gray-800"
      disabled={!onClick}
      onPress={() => {
        if (onClick) onClick();
      }}
    >
      <View className="flex flex-row items-center p-3">
        {/* <View className="h-12 w-12 rounded-full bg-pink-600 mr-2" /> */}

        <View className="flex-1">
          <Text
            style={{ flex: 1 }}
            className="text-lg font-bold text-gray-200"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {vehicle?.plateNumber}
          </Text>

          <Text
            style={{ flex: 1 }}
            className="text-xs text-gray-400"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {vehicle?.model}
          </Text>
        </View>
      </View>

      <View className="absolute top-1 right-1 rounded border border-blue-500 bg-blue-600 px-2">
        <Text className="text-xs text-white">{vehicle?.type}</Text>
      </View>
    </TouchableOpacity>
  );
};
