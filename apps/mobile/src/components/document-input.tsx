import { View, Text, Image, TouchableOpacity } from "react-native";
import { getDocument } from "../utils/helpers";

interface DocumentInputProps {
  label?: string;
  className?: string;
  containerClassname?: string;
  uri: string | null;
  callback: <T>(value: T | null) => void;
}

export const DocumentInput = ({
  label,
  callback,
  uri,
  containerClassname = "mt-4",
}: DocumentInputProps) => {
  return (
    <View className={containerClassname}>
      {label && <Text className="text-gray-400 text-xs ml-2">{label}</Text>}
      <View className="border-gray-700 bg-gray-800 mt-1 rounded-lg border-2 p-3 text-white">
        {!uri ? (
          <View className="h-32 w-full bg-gray-700 rounded-md" />
        ) : (
          <Image
            className="h-32 w-full bg-gray-700 rounded-md"
            source={{ uri }}
          />
        )}

        <View className="mt-3 items-center justify-end flex flex-row">
          <TouchableOpacity
            onPress={async () => {
              callback?.(null);
            }}
          >
            <Text className="text-red-600 text-sm">Discard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              const res = await getDocument();
              callback?.(res);
            }}
          >
            <Text className="ml-4 text-white text-sm"></Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
