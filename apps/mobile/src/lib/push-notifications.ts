import { Alert, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export const getPushNotificationToken = async () => {
  try {
    let token: string | null = null;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("Failed to get push token for push notification!");
        return null;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      Alert.alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  } catch (err: any) {
    Alert.alert(
      "Notification Error",
      err.message ? err.message : JSON.stringify(err, null, 2)
    );
    return null;
  }
};
