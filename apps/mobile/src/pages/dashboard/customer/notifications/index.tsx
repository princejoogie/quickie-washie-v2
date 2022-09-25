import { Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useIsFocused } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  CustomerNotificationsStack,
  CustomerNotificationsStackParamList,
} from "./types";
import { CustomerDashboardParamList } from "../types";

import { Layout, LoadingText } from "../../../../components";
import notificationService from "../../../../services/notification";

export const Notifications = ({}: BottomTabScreenProps<
  CustomerDashboardParamList,
  "Notifications"
>) => {
  return (
    <CustomerNotificationsStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#111827",
        },
      }}
      initialRouteName="AllNotifications"
    >
      <CustomerNotificationsStack.Screen
        name="AllNotifications"
        component={AllNotifications}
      />
    </CustomerNotificationsStack.Navigator>
  );
};

const AllNotifications = ({}: NativeStackScreenProps<
  CustomerNotificationsStackParamList,
  "AllNotifications"
>) => {
  const notifications = useQuery(["notifications"], notificationService.getAll);
  const isFocused = useIsFocused();

  if (isFocused && notifications.isStale) {
    notifications.refetch();
  }

  return (
    <Layout
      noPadding
      nav={{
        title: "Notifications",
        actions: (
          <TouchableOpacity>
            <Text className="text-blue-600 text-xs">Mark all read</Text>
          </TouchableOpacity>
        ),
      }}
      onRefresh={notifications.refetch}
    >
      {notifications.isLoading ? (
        <LoadingText />
      ) : notifications.data && notifications.data.length > 0 ? (
        notifications.data.map((notif, idx) => (
          <TouchableOpacity
            key={notif.id}
            className={`relative p-4 ${
              idx > 0 ? "border-t border-gray-700" : ""
            } ${notif.seen ? "" : "bg-gray-800"}`}
          >
            {!notif.seen && (
              <View
                className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"
                style={{ top: 10, right: 10 }}
              />
            )}
            <Text className="text-white">{notif.title}</Text>
            <Text className="text-gray-400 text-xs">{notif.content}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text className="text-gray-400 text-center text-xs mt-4">
          No appointments available.
        </Text>
      )}
    </Layout>
  );
};
