import { Text, TouchableOpacity, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { Layout, ServiceCard } from "../../../../components";
import servicesService from "../../../../services/services";

import { CustomerDashboardParamList } from "../types";

import { HomeStack, HomeStackParamList } from "./types";
import { BookService } from "./book-service";

export const Home = ({}: BottomTabScreenProps<
  CustomerDashboardParamList,
  "Home"
>) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#111827",
        },
      }}
      initialRouteName="CustomerHome"
    >
      <HomeStack.Screen name="CustomerHome" component={CustomerHome} />
      <HomeStack.Screen name="BookService" component={BookService} />
    </HomeStack.Navigator>
  );
};

const CustomerHome = ({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, "CustomerHome">) => {
  return (
    <Layout nav={{ title: "Home" }}>
      <Services navigation={navigation} />
      <Reviews />
    </Layout>
  );
};

const Services = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<HomeStackParamList, "CustomerHome">;
}) => {
  const services = useQuery(["services"], servicesService.getAll);
  const isFocused = useIsFocused();

  if (isFocused && services.isStale) {
    services.refetch();
  }

  return (
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
  );
};

const Reviews = () => {
  return (
    <View className="mt-3">
      <View className="flex px-2 flex-row items-center justify-between">
        <Text className="text-white text-lg font-bold">Reviews</Text>

        <TouchableOpacity>
          <Text className="text-blue-600 text-xs">See all</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-gray-400 text-center text-xs">No reviews yet.</Text>
    </View>
  );
};
