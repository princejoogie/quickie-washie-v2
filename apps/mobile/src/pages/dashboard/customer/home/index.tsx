import { Image, Text, TouchableOpacity, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { Layout, LoadingText, ServiceCard } from "../../../../components";
import servicesService from "../../../../services/services";

import { CustomerDashboardParamList } from "../types";

import { HomeStack, HomeStackParamList } from "./types";
import { BookService } from "./book-service";
import { AllServices } from "./all-services";
import reviewService from "../../../../services/reviews";
import { queryClient } from "../../../../services/api";
import { StarIcon } from "../../../../components/icon/star-icon";
import { formatDistanceToNow } from "date-fns";

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
      <HomeStack.Screen name="AllServices" component={AllServices} />
      <HomeStack.Screen name="BookService" component={BookService} />
    </HomeStack.Navigator>
  );
};

const CustomerHome = ({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, "CustomerHome">) => {
  return (
    <Layout
      nav={{ title: "Home" }}
      onRefresh={() => {
        queryClient.invalidateQueries(["services"]);
        queryClient.invalidateQueries(["reviews"]);
      }}
    >
      <Services navigation={navigation} />
      <Reviews navigation={navigation} />
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
      <View className="flex flex-row items-center justify-between px-2">
        <Text className="text-lg font-bold text-white">Services</Text>

        {services.data && services.data.length > 0 && (
          <TouchableOpacity onPress={() => navigation.navigate("AllServices")}>
            <Text className="text-xs text-blue-600">See all</Text>
          </TouchableOpacity>
        )}
      </View>

      {services.isLoading ? (
        <LoadingText />
      ) : services.data && services.data.length > 0 ? (
        services.data.slice(0, 5).map((service) => (
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
        ))
      ) : (
        <Text className="text-center text-xs text-gray-400">
          No services available.
        </Text>
      )}
    </View>
  );
};

const Reviews = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<HomeStackParamList, "CustomerHome">;
}) => {
  const reviews = useQuery(["reviews"], reviewService.getAll);
  const isFocused = useIsFocused();

  if (isFocused && reviews.isStale) {
    reviews.refetch();
  }

  return (
    <View className="mt-3">
      <View className="flex flex-row items-center justify-between px-2">
        <Text className="text-lg font-bold text-white">Reviews</Text>

        {reviews.data && reviews.data.length > 0 && (
          <TouchableOpacity onPress={() => navigation.navigate("AllServices")}>
            <Text className="text-xs text-blue-600">See all</Text>
          </TouchableOpacity>
        )}
      </View>

      {reviews.isLoading ? (
        <LoadingText />
      ) : reviews.data && reviews.data.length > 0 ? (
        reviews.data.slice(0, 5).map((review) => (
          <View
            key={review.id}
            className="relative mt-3 rounded-lg border-2 border-gray-700 bg-gray-800 p-3"
          >
            {review.User ? (
              <View className="flex flex-row items-center">
                <Image
                  className="mr-2 h-8 w-8 rounded-full"
                  source={{ uri: review.User.photoUrl }}
                />

                <View className="flex-1">
                  <View className="flex flex-row items-center justify-between">
                    <Text
                      className="flex-1 text-xs text-gray-400"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {review.User.name}
                    </Text>

                    <Text className="text-gray-400" style={{ fontSize: 10 }}>
                      {formatDistanceToNow(new Date(review.createdAt), {
                        addSuffix: true,
                      })}
                    </Text>
                  </View>

                  <View className="flex flex-row items-center">
                    <Text className="mr-1 text-xs text-yellow-600">
                      {review.rating.toFixed(1)}
                    </Text>

                    {Array(review.rating)
                      .fill(0)
                      .map((_, i) => (
                        <StarIcon
                          filled
                          key={`${review.id}-star-${i}`}
                          styleName="text-yellow-400 h-3 w-3"
                        />
                      ))}
                  </View>
                </View>
              </View>
            ) : (
              <Text className="text-xs italic text-red-600">No user</Text>
            )}

            {review.Appointment?.Service ? (
              <TouchableOpacity
                className="my-2 w-full border-l-4 border-gray-600 bg-gray-700 p-1"
                onPress={() => {
                  if (review.Appointment?.Service) {
                    navigation.navigate("BookService", {
                      serviceId: review.Appointment.Service.id,
                    });
                  }
                }}
              >
                <Text className="text-gray-200">
                  Service: {review.Appointment?.Service?.name}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text>Service not found</Text>
            )}

            <Text className="text-white">{review.content}</Text>
          </View>
        ))
      ) : (
        <Text className="text-center text-xs text-gray-400">
          No reviews available.
        </Text>
      )}
    </View>
  );
};
