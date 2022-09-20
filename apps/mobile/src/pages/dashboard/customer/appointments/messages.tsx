import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

import { AppointmentMessagesStackParamList } from "./types";
import { Layout } from "../../../../components";

export const Messages = ({
  route,
  navigation,
}: NativeStackScreenProps<AppointmentMessagesStackParamList, "Messages">) => {
  const props = route.params;

  return (
    <Layout
      nav={{
        title: "Conversation",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
      }}
    >
      <View className="border-gray-700 bg-gray-800 mt-1 rounded-xl border-2 relative px-3 pb-3 pt-1">
        <View className="mt-2 self-end bg-blue-600 p-2 rounded-l-lg rounded-tr-lg max-w-[80%]">
          <Text className="text-white">
            Do you accept gcash? Do you accept gcash? Do you accept gcash? Do
            you accept gcash? Do you accept gcash? Do you accept gcash? Do you
            accept gcash?
          </Text>
        </View>

        <View className="mt-2 self-start bg-gray-600 p-2 rounded-l-lg rounded-tr-lg max-w-[80%]">
          <Text className="text-white">Yes we do</Text>
        </View>
        <View className="mt-2 self-end bg-blue-600 p-2 rounded-l-lg rounded-tr-lg max-w-[80%]">
          <Text className="text-white">
            Do you accept gcash? Do you accept gcash? Do you accept gcash? Do
            you accept gcash? Do you accept gcash? Do you accept gcash? Do you
            accept gcash?
          </Text>
        </View>

        <View className="mt-2 self-start bg-gray-600 p-2 rounded-l-lg rounded-tr-lg max-w-[80%]">
          <Text className="text-white">Yes we do</Text>
        </View>
        <View className="mt-2 self-end bg-blue-600 p-2 rounded-l-lg rounded-tr-lg max-w-[80%]">
          <Text className="text-white">
            Do you accept gcash? Do you accept gcash? Do you accept gcash? Do
            you accept gcash? Do you accept gcash? Do you accept gcash? Do you
            accept gcash?
          </Text>
        </View>

        <View className="mt-2 self-start bg-gray-600 p-2 rounded-l-lg rounded-tr-lg max-w-[80%]">
          <Text className="text-white">Yes we do</Text>
        </View>
        <View className="mt-2 self-end bg-blue-600 p-2 rounded-l-lg rounded-tr-lg max-w-[80%]">
          <Text className="text-white">
            Do you accept gcash? Do you accept gcash? Do you accept gcash? Do
            you accept gcash? Do you accept gcash? Do you accept gcash? Do you
            accept gcash?
          </Text>
        </View>

        <View className="mt-2 self-start bg-gray-600 p-2 rounded-l-lg rounded-tr-lg max-w-[80%]">
          <Text className="text-white">Yes we do</Text>
        </View>
      </View>
    </Layout>
  );
};
