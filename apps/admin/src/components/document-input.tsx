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
      {label && <Text className="ml-2 text-xs text-gray-400">{label}</Text>}
      <View className="mt-1 rounded-lg border-2 border-gray-700 bg-gray-800 p-3 text-white">
        {!uri ? (
          <View className="h-32 w-full rounded-md bg-gray-700" />
        ) : (
          <Image
            className="h-32 w-full rounded-md bg-gray-700"
            source={{ uri }}
          />
        )}

        <View className="mt-3 flex flex-row items-center justify-end">
          <TouchableOpacity
            onPress={async () => {
              callback?.(null);
            }}
          >
            <Text className="text-sm text-red-600">Discard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              const res = await getDocument();
              callback?.(res);
            }}
          >
            <Text className="ml-4 text-sm text-white"></Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
