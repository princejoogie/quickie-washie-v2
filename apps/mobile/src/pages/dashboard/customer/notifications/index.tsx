import { useState } from "react";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useIsFocused } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { formatDistanceToNow } from "date-fns";

import { CustomerDashboardParamList } from "../types";

import { Layout, LoadingText } from "../../../../components";
import notificationService from "../../../../services/notification";

interface NotificationModalProps {
  notification: {
    title: string;
    content: string;
    createdAt: string;
  };
  visible: boolean;
  closeModal: () => void;
}

const NotificationModal = ({
  visible,
  closeModal,
  notification,
}: NotificationModalProps) => {
  return (
    <View className="flex-1">
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          activeOpacity={90}
          onPress={closeModal}
          className="flex flex-col flex-1 items-center justify-center bg-black/70"
        >
          <View className="bg-gray-900 w-10/12 rounded-lg border-2 border-gray-800 p-4">
            <Text className="text-white text-lg font-bold w-full">
              {notification.title}
            </Text>
            <Text className="text-gray-300 mt-1">{notification.content}</Text>

            <Text
              className="mt-2 self-end text-gray-400"
              style={{ fontSize: 10 }}
            >
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export const Notifications = ({}: BottomTabScreenProps<
  CustomerDashboardParamList,
  "Notifications"
>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState({
    title: "",
    content: "",
    createdAt: "",
  });

  const mark = useMutation(notificationService.mark);
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
          <TouchableOpacity
            onPress={() => {
              mark.mutate({
                notificationIds: notifications.data
                  ? notifications.data.filter((e) => !e.seen).map((e) => e.id)
                  : [],
              });
            }}
          >
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
            onPress={() => {
              mark.mutate({ notificationIds: [notif.id] });
              setCurrentNotification({
                content: notif.content,
                title: notif.title,
                createdAt: `${notif.createdAt}`,
              });
              setModalVisible(true);
            }}
            className={`relative p-4 ${
              idx > 0 ? "border-t border-gray-700" : ""
            } ${notif.seen ? "" : "bg-gray-800"}`}
          >
            {!notif.seen && (
              <View className="absolute top-3 right-3 w-2 h-2 bg-green-500 rounded-full" />
            )}

            <Text
              className="absolute bottom-2 right-2 text-gray-400"
              style={{ fontSize: 10 }}
            >
              {formatDistanceToNow(new Date(notif.createdAt), {
                addSuffix: true,
              })}
            </Text>

            <Text
              className="text-white font-bold w-full"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {notif.title}{" "}
            </Text>

            <Text
              className="text-gray-300 text-xs mt-2 w-full mb-4"
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {notif.content}{" "}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text className="text-gray-400 text-center text-xs mt-4">
          No notifications available.
        </Text>
      )}

      {modalVisible && (
        <NotificationModal
          notification={currentNotification}
          visible={true}
          closeModal={() => setModalVisible(false)}
        />
      )}
    </Layout>
  );
};
