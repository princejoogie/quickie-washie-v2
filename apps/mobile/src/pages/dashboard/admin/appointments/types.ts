import { createNativeStackNavigator } from "@react-navigation/native-stack";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AdminAppointmentsStackParamList = {
  AllAppointments: undefined;
  AppointmentDetail: { appointmentId: string };
};

export const AdminAppointmentsStack =
  createNativeStackNavigator<AdminAppointmentsStackParamList>();

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AdminAppointmentMessagesStackParamList = {
  Details: { appointmentId: string };
  Messages: { appointmentId: string };
};

export const AdminAppointmentMessagesStack =
  createNativeStackNavigator<AdminAppointmentMessagesStackParamList>();
