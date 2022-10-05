import { useEffect } from "react";
import * as Notifications from "expo-notifications";

// defines how device should handle a notification when the app is running (foreground notifications)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const useNotifications = () => {
  useEffect(() => {
    // listener triggered whenever a notification is received while the app is in the foreground
    console.log("useNotifications");
    const fgNotificationSubscriber =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(JSON.stringify(notification, null, 2));
      });

    return () => {
      // cleanup the listener and task registry
      fgNotificationSubscriber.remove();
    };
  }, []);
};
