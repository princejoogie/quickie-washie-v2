import { View, Text, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { format } from "date-fns";

import {
  AdminAppointmentMessagesStack,
  AdminAppointmentMessagesStackParamList,
  AdminAppointmentsStackParamList,
} from "./types";

import appointmentService from "../../../../services/appointment";
import { Layout } from "../../../../components";
import { ChatIcon } from "../../../../components/chat-icon";
import { Messages } from "./messages";

export const AdminAppointmentDetail = ({
  route,
}: NativeStackScreenProps<
  AdminAppointmentsStackParamList,
  "AppointmentDetail"
>) => {
  const props = route.params;

  return (
    <AdminAppointmentMessagesStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#111827",
        },
      }}
      initialRouteName="Details"
    >
      <AdminAppointmentMessagesStack.Screen
        name="Details"
        component={Details}
        initialParams={props}
      />
      <AdminAppointmentMessagesStack.Screen
        name="Messages"
        component={Messages}
      />
    </AdminAppointmentMessagesStack.Navigator>
  );
};

const Details = ({
  route,
  navigation,
}: NativeStackScreenProps<
  AdminAppointmentMessagesStackParamList,
  "Details"
>) => {
  const props = route.params;
  const appointment = useQuery(["appointment", props.id], (e) =>
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

        <View className="border-gray-700 bg-gray-800 mt-3 rounded-lg border-2 relative">
          <View className="flex flex-row items-center p-3">
            <View className="h-12 w-12 rounded-full bg-pink-600 mr-2" />

            <View className="flex-1">
              <Text
                style={{ flex: 1 }}
                className="text-lg text-gray-200 font-bold"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {a.Vehicle?.plateNumber}
              </Text>

              <Text
                style={{ flex: 1 }}
                className="text-gray-400 text-xs"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {a.Vehicle?.model}
              </Text>
            </View>
          </View>
        </View>
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
