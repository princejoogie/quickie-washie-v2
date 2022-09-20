import { Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useIsFocused } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  CustomerAppointmentsStack,
  CustomerAppointmentsStackParamList,
} from "./types";

import { CustomerDashboardParamList } from "../types";

import { AppointmentCard, Layout } from "../../../../components";
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
