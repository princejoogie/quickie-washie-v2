import { createNativeStackNavigator } from "@react-navigation/native-stack";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CustomerAppointmentsStackParamList = {
  AllAppointments: undefined;
  AppointmentDetail: { appointmentId: string };
};

export const CustomerAppointmentsStack =
  createNativeStackNavigator<CustomerAppointmentsStackParamList>();

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AppointmentMessagesStackParamList = {
  Details: { appointmentId: string };
  Messages: { appointmentId: string };
};

export const AppointmentMessagesStack =
  createNativeStackNavigator<AppointmentMessagesStackParamList>();
