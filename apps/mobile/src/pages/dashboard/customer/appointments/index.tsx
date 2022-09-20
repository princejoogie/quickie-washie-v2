import { Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useIsFocused } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { GetAllAppointmentsResponse } from "@qw/dto";
import { format } from "date-fns";

import {
  CustomerAppointmentsStack,
  CustomerAppointmentsStackParamList,
} from "./types";

import { CustomerDashboardParamList } from "../types";

import { Layout } from "../../../../components";
import appointmentService from "../../../../services/appointment";
import { AppointmentDetail } from "./appointment-detail";

export const Appointments = ({}: BottomTabScreenProps<
  CustomerDashboardParamList,
  "Appointments"
>) => {
  return (
    <CustomerAppointmentsStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#111827",
        },
      }}
      initialRouteName="AllAppointments"
    >
      <CustomerAppointmentsStack.Screen
        name="AllAppointments"
        component={AllAppointments}
      />
      <CustomerAppointmentsStack.Screen
        name="AppointmentDetail"
        component={AppointmentDetail}
      />
    </CustomerAppointmentsStack.Navigator>
  );
};

const AllAppointments = ({
  navigation,
}: NativeStackScreenProps<
  CustomerAppointmentsStackParamList,
  "AllAppointments"
>) => {
  const appointments = useQuery(["appointments"], appointmentService.getAll);
  const isFocused = useIsFocused();

  if (isFocused && appointments.isStale) {
    appointments.refetch();
  }

  return (
    <Layout nav={{ title: "Appointments" }} onRefresh={appointments.refetch}>
      {appointments.isLoading ? (
        <Text>Loading...</Text>
      ) : (
        appointments.data?.map((appointment) => (
          <AppointmentItem
            key={appointment.id}
            appointment={appointment}
            navigation={navigation}
          />
        ))
      )}
    </Layout>
  );
};

interface AppointmentItemProps {
  appointment: GetAllAppointmentsResponse[number];
  navigation: NativeStackNavigationProp<
    CustomerAppointmentsStackParamList,
    "AllAppointments"
  >;
}

const AppointmentItem = ({ appointment, navigation }: AppointmentItemProps) => {
  const date = new Date(appointment.date);
  const vehicle = appointment.Vehicle;

  return (
    <TouchableOpacity
      key={appointment.id}
      onPress={() => {
        navigation.navigate("AppointmentDetail", appointment);
      }}
      className="border-gray-700 bg-gray-800 mt-3 rounded-xl border-2 relative p-3"
    >
      <Text className="text-white text-lg font-bold">
        {appointment.Service?.name}
      </Text>
      <Text className="text-gray-400 text-xs">
        {format(date, "MMM d, yyyy")}
      </Text>
      <Text className="text-gray-400 text-xs">{format(date, "hh:mm aa")}</Text>

      <View className="bg-green-600 border border-green-500 rounded px-2 absolute top-1 right-1">
        <Text className="text-white text-xs">{appointment.status}</Text>
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
      </View>
    </TouchableOpacity>
  );
};
