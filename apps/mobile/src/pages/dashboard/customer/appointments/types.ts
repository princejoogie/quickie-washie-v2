import { GetAllAppointmentsResponse } from "@qw/dto";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CustomerAppointmentsStackParamList = {
  AllAppointments: undefined;
  AppointmentDetail: GetAllAppointmentsResponse[number];
};

export const CustomerAppointmentsStack =
  createNativeStackNavigator<CustomerAppointmentsStackParamList>();

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AppointmentMessagesStackParamList = {
  Details: GetAllAppointmentsResponse[number];
  Messages: { appointmentId: string };
};

export const AppointmentMessagesStack =
  createNativeStackNavigator<AppointmentMessagesStackParamList>();
