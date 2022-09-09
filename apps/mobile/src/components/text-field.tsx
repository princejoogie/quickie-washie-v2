import { View, Text, TextInput, TextInputProps } from "react-native";

interface TextFieldProps extends TextInputProps {
  test?: string;
  label?: string;
  containerClassname?: string;
}

export const TextField = ({
  className,
  label,
  containerClassname = "mt-4",
  ...rest
}: TextFieldProps) => {
  return (
    <View className={containerClassname}>
      {label && <Text className="text-gray-400 text-xs ml-2">{label}</Text>}
      <TextInput
        {...rest}
        placeholderTextColor="#71717a"
        className="border-gray-700 bg-gray-800 mt-1 rounded-lg border-2 px-4 py-3 text-white"
      />
    </View>
  );
};
