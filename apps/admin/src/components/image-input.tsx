import { View, Text, Image, TouchableOpacity } from "react-native";
import { getImage } from "../utils/helpers";

interface ImageInputProps {
  label?: string;
  className?: string;
  containerClassname?: string;
  editable?: boolean;
  uri: string | null;
  callback: (value: { uri: string; base64: string | undefined } | null) => void;
}

export const ImageInput = ({
  label,
  callback,
  uri,
  editable = true,
  containerClassname = "mt-4",
}: ImageInputProps) => {
  return (
    <View className={containerClassname}>
      {label && <Text className="ml-2 text-xs text-gray-400">{label}</Text>}
      <View
        className={`mt-1 rounded-lg border-2 bg-gray-800 p-3 text-white ${
          editable ? "border-gray-700" : "border-transparent"
        }`}
      >
        {!uri ? (
          <View className="h-32 w-full rounded-md bg-gray-700" />
        ) : (
          <Image
            className="h-32 w-full rounded-md bg-gray-700"
            source={{ uri }}
          />
        )}

        {editable && (
          <View className="mt-3 flex flex-row items-center justify-end">
            <TouchableOpacity
              onPress={async () => {
                const res = await getImage();
                callback?.(res);
              }}
            >
              <Text className="ml-4 text-sm text-blue-600">Choose Image</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
