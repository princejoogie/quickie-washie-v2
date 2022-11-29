import { forwardRef } from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";

interface TextFieldProps extends TextInputProps {
  label?: string;
  containerClassname?: string;
}

// eslint-disable-next-line react/display-name
export const TextField = forwardRef<TextInput, TextFieldProps>(
  ({ label, containerClassname = "mt-4", editable = true, ...rest }, ref) => {
    return (
      <View className={containerClassname}>
        {label && <Text className="ml-2 text-xs text-gray-400">{label}</Text>}
        <TextInput
          {...rest}
          ref={ref}
          editable={editable}
          placeholderTextColor="#71717a"
          className={`mt-1 rounded-lg border-2 bg-gray-800 px-4 py-3 text-white ${
            editable
              ? "border-gray-700 opacity-100"
              : "border-transparent opacity-60"
          }`}
        />
      </View>
    );
  }
);
