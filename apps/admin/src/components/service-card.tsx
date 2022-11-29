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
      className="relative mt-3 rounded-lg border-2 border-gray-700 bg-gray-800"
    >
      <View className="p-3">
        <Text className="text-gray-200">{service.name}</Text>
        <Text className="text-xs text-gray-400">{service.description}</Text>
      </View>

      <Text className="absolute top-1 right-1 font-bold text-green-600">
        ₱ {service.basePrice}
      </Text>
    </TouchableOpacity>
  );
};
