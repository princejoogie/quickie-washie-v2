import { Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useIsFocused } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  AdminAppointmentsStackParamList,
  AdminAppointmentsStack,
} from "./types";
import { AdminDashboardParamList } from "../types";

import { AppointmentCard, Layout } from "../../../../components";
import appointmentService from "../../../../services/appointment";

export const Appointments = ({}: BottomTabScreenProps<
  AdminDashboardParamList,
  "Appointments"
>) => {
  return (
    <AdminAppointmentsStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#111827",
        },
      }}
      initialRouteName="AllAppointments"
    >
      <AdminAppointmentsStack.Screen
        name="AllAppointments"
        component={AllAppointments}
      />
    </AdminAppointmentsStack.Navigator>
  );
};

const AllAppointments = ({
  navigation,
}: NativeStackScreenProps<
  AdminAppointmentsStackParamList,
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
        appointments.data?.map((apt) => (
          <AppointmentCard
            key={apt.id}
            appointment={apt}
            onClick={() => {
              navigation.navigate("AppointmentDetail", apt);
            }}
          />
        ))
      )}
    </Layout>
  );
};
