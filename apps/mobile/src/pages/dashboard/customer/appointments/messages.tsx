import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

import { AppointmentMessagesStackParamList } from "./types";
import { Layout } from "../../../../components";
import { useQuery } from "@tanstack/react-query";
import messageService from "../../../../services/messages";
import { useAuthContext } from "../../../../contexts/auth-context";

export const Messages = ({
  route,
  navigation,
}: NativeStackScreenProps<AppointmentMessagesStackParamList, "Messages">) => {
  const { data: me } = useAuthContext();
  const props = route.params;

  const messages = useQuery(["messages", props.appointmentId], (e) =>
    messageService.getAll({
      appointmentId: e.queryKey[1],
    })
  );

  return (
    <Layout
      nav={{
        title: "Conversation",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
      }}
    >
      {messages.data?.map((msg) => {
        const isMe = msg.User?.id === me?.id;
        if (!msg.seen) {
          // update
        }

        const classes = isMe
          ? "bg-blue-600 self-end rounded-l-lg rounded-tr-lg"
          : "bg-gray-600 self-start rounded-r-lg rounded-tl-lg";

        return (
          <View key={msg.id} className={`mt-2 p-2 max-w-[80%] ${classes}`}>
            <Text className="text-white">{msg.content}</Text>
          </View>
        );
      })}
    </Layout>
  );
};
