import { createNativeStackNavigator } from "@react-navigation/native-stack";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CustomerNotificationsStackParamList = {
  AllNotifications: undefined;
  NotificationDetail: { notificationId: string };
};

export const CustomerNotificationsStack =
  createNativeStackNavigator<CustomerNotificationsStackParamList>();
