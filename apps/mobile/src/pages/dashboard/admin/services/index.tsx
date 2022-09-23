import { TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";

import { ServicesStack, ServicesStackParamList } from "./types";
import { NewService } from "./new-service";
import { ServiceDetail } from "./service-detail";

import { AdminDashboardParamList } from "../types";

import { Layout, ServiceCard } from "../../../../components";
import { PlusIcon } from "../../../../components/icon/plus-icon";
import servicesService from "../../../../services/services";

export const Services = ({}: BottomTabScreenProps<
  AdminDashboardParamList,
  "Services"
>) => {
  return (
    <ServicesStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#111827",
        },
      }}
      initialRouteName="AllServices"
    >
      <ServicesStack.Screen name="AllServices" component={AllServices} />
      <ServicesStack.Screen name="NewService" component={NewService} />
      <ServicesStack.Screen name="ServiceDetail" component={ServiceDetail} />
    </ServicesStack.Navigator>
  );
};

export const AllServices = ({
  navigation,
}: NativeStackScreenProps<ServicesStackParamList, "AllServices">) => {
  const services = useQuery(["services"], servicesService.getAll);
  const isFocused = useIsFocused();

  if (isFocused && services.isStale) {
    services.refetch();
  }

  return (
    <Layout
      onRefresh={services.refetch}
      nav={{
        title: "Services",
        actions: (
          <TouchableOpacity
            className="flex flex-row items-center"
            onPress={() => {
              navigation.navigate("NewService");
            }}
          >
            <PlusIcon />
          </TouchableOpacity>
        ),
      }}
    >
      {services.data?.map((service) => (
        <ServiceCard
          key={service.id}
          onPress={() => {
            navigation.navigate("ServiceDetail", { serviceId: service.id });
          }}
          service={{
            name: service.name,
            basePrice: service.basePrice.toString(),
            description: service.description,
          }}
        />
      ))}
    </Layout>
  );
};
