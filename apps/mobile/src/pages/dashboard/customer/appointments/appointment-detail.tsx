import { View, Text, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { format } from "date-fns";

import {
  CustomerAppointmentsStackParamList,
  AppointmentMessagesStack,
  AppointmentMessagesStackParamList,
} from "./types";
import { Messages } from "./messages";

import appointmentService from "../../../../services/appointment";
import { Layout, VehicleCard } from "../../../../components";
import { ChatIcon } from "../../../../components/icon/chat-icon";

export const AppointmentDetail = ({}: NativeStackScreenProps<
  CustomerAppointmentsStackParamList,
  "AppointmentDetail"
>) => {
  return (
    <AppointmentMessagesStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#111827",
        },
      }}
      initialRouteName="Details"
    >
      <AppointmentMessagesStack.Screen name="Details" component={Details} />
      <AppointmentMessagesStack.Screen name="Messages" component={Messages} />
    </AppointmentMessagesStack.Navigator>
  );
};

const Details = ({
  route,
  navigation,
}: NativeStackScreenProps<AppointmentMessagesStackParamList, "Details">) => {
  const { appointmentId } = route.params;
  const appointment = useQuery(["appointment", appointmentId], (e) =>
    appointmentService.getById({ appointmentId: e.queryKey[1] })
  );

  if (appointment.isLoading) {
    return (
      <Layout
        nav={{
          title: "Appointment Detail",
          canGoBack: navigation.canGoBack(),
          onBack: navigation.goBack,
        }}
      >
        <Text>Loading...</Text>
      </Layout>
    );
  }

  if (!appointment.data) {
    return (
      <Layout
        nav={{
          title: "Appointment Detail",
          canGoBack: navigation.canGoBack(),
          onBack: navigation.goBack,
        }}
      >
        <Text>Appointment not found</Text>
      </Layout>
    );
  }

  const a = appointment.data;
  const date = new Date(a.date);

  return (
    <Layout
      nav={{
        title: "Appointment Detail",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
        actions: (
          <TouchableOpacity
            className="flex flex-row"
            onPress={() => {
              navigation.navigate("Messages", { appointmentId: a.id });
            }}
          >
            {a._count.messages > 0 && (
              <View className="mr-1 px-2 py-1 rounded-full bg-blue-600 items-center, justify-center">
                <Text className="text-white text-xs h-4">
                  {a._count.messages}
                </Text>
              </View>
            )}
            <ChatIcon />
          </TouchableOpacity>
        ),
      }}
      onRefresh={appointment.refetch}
    >
      <Text className="text-gray-400 text-xs ml-2 mt-4">Details</Text>
      <View className="border-gray-700 bg-gray-800 mt-1 rounded-xl border-2 relative p-3">
        <Text className="text-white text-lg font-bold">{a.Service?.name}</Text>
        <Text className="text-gray-400 text-xs">
          {format(date, "MMM d, yyyy")}
        </Text>
        <Text className="text-gray-400 text-xs">
          {format(date, "hh:mm aa")}
        </Text>

        <View className="bg-green-600 border border-green-500 rounded px-2 absolute top-1 right-1">
          <Text className="text-white text-xs">{a.status}</Text>
        </View>

        <VehicleCard vehicle={a.Vehicle ?? undefined} />
      </View>

      <Text className="text-gray-400 text-xs ml-2 mt-4">Documents</Text>
      <View className="border-gray-700 bg-gray-800 mt-1 rounded-xl border-2 relative p-3">
        <Text className="text-xs text-white text-center">No documents</Text>

        <TouchableOpacity className="mt-2 self-center bg-gray-600 p-2 rounded">
          <Text className="text-white">Upload documents</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};
