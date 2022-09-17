import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

interface ServiceCardProps extends TouchableOpacityProps {
  service: {
    name: string;
    description: string;
    basePrice: string;
  };
}

export const ServiceCard = ({ service, ...rest }: ServiceCardProps) => {
  return (
    <TouchableOpacity
      {...rest}
      className="border-gray-700 bg-gray-800 mt-3 rounded-lg border-2 relative"
    >
      <View className="p-3">
        <Text className="text-gray-200">{service.name}</Text>
        <Text className="text-gray-400 text-xs">{service.description}</Text>
      </View>

      <Text className="absolute top-1 right-1 text-green-600 font-bold">
        ₱ {service.basePrice}
      </Text>
    </TouchableOpacity>
  );
};
