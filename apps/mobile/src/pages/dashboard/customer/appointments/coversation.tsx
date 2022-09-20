import { View, Text } from "react-native";
import { Layout } from "../../../../components";

export const Conversation = () => {
  return (
    <Layout
      nav={{
        title: "Conversation",
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
