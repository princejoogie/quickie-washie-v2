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
      {label && <Text className="text-gray-400 text-xs ml-2">{label}</Text>}
      <View
        className={`bg-gray-800 mt-1 rounded-lg border-2 p-3 text-white ${
          editable ? "border-gray-700" : "border-transparent"
        }`}
      >
        {!uri ? (
          <View className="h-32 w-full bg-gray-700 rounded-md" />
        ) : (
          <Image
            className="h-32 w-full bg-gray-700 rounded-md"
            source={{ uri }}
          />
        )}

        {editable && (
          <View className="mt-3 items-center justify-end flex flex-row">
            <TouchableOpacity
              onPress={async () => {
                const res = await getImage();
                callback?.(res);
              }}
            >
              <Text className="ml-4 text-blue-600 text-sm">Choose Image</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
