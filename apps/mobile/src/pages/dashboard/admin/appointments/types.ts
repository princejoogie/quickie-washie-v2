import { GetAllAppointmentsResponse } from "@qw/dto";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AdminAppointmentsStackParamList = {
  AllAppointments: undefined;
  AppointmentDetail: GetAllAppointmentsResponse[number];
};

export const AdminAppointmentsStack =
  createNativeStackNavigator<AdminAppointmentsStackParamList>();

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AdminAppointmentMessagesStackParamList = {
  Details: GetAllAppointmentsResponse[number];
  Messages: { appointmentId: string };
};

export const AdminAppointmentMessagesStack =
  createNativeStackNavigator<AdminAppointmentMessagesStackParamList>();
