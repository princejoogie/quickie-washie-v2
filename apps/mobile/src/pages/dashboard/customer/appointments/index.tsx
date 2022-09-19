import { Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useIsFocused } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  CustomerAppointmentsStack,
  CustomerAppointmentsStackParamList,
} from "./types";

import { CustomerDashboardParamList } from "../types";

import { Layout } from "../../../../components";
import appointmentService from "../../../../services/appointment";

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
    </CustomerAppointmentsStack.Navigator>
  );
};

const AllAppointments = ({}: NativeStackScreenProps<
  CustomerAppointmentsStackParamList,
  "AllAppointments"
>) => {
  const appointments = useQuery(["appointments"], appointmentService.getAll);
  const isFocused = useIsFocused();

  if (isFocused && appointments.isStale) {
    appointments.refetch();
  }

  return (
    <Layout nav={{ title: "Appointments" }}>
      {appointments.isLoading ? (
        <Text>Loading...</Text>
      ) : (
        appointments.data?.map((appointment) => (
          <View key={appointment.id}>
            <Text className="text-white">{appointment.id}</Text>
          </View>
        ))
      )}
    </Layout>
  );
};
