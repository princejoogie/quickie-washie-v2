/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Expo, ExpoPushMessage } from "expo-server-sdk";

const expo = new Expo();

interface SendPushNotificationProps {
  tokens: string[];
  title: string;
  message: string;
}

export const sendPushNotification = async ({
  title,
  tokens,
  message,
}: SendPushNotificationProps) => {
  const messages: ExpoPushMessage[] = tokens.map((token) => ({
    to: token,
    sound: "default",
    title,
    body: message,
    data: { message },
  }));

  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];
  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }
};
