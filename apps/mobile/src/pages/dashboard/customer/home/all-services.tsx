import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Text, TouchableOpacity, View } from "react-native";
import { Layout, ServiceCard } from "../../../../components";
import servicesService from "../../../../services/services";
import { HomeStackParamList } from "./types";

export const AllServices = ({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, "AllServices">) => {
  const services = useQuery(["services"], servicesService.getAll);

  return (
    <Layout
      nav={{
        title: "All Services",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
      }}
    >
      <View className="mt-3">
        <View className="flex px-2 flex-row items-center justify-between">
          <Text className="text-white text-lg font-bold">Services</Text>

          <TouchableOpacity>
            <Text className="text-blue-600 text-xs">See all</Text>
          </TouchableOpacity>
        </View>

        {services.data?.map((service) => (
          <ServiceCard
            key={service.id}
            onPress={() => {
              navigation.navigate("BookService", { serviceId: service.id });
            }}
            service={{
              name: service.name,
              basePrice: service.basePrice.toString(),
              description: service.description,
            }}
          />
        ))}
      </View>
    </Layout>
  );
};
