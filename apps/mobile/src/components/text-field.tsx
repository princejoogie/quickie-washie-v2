import { TextInput, TextInputProps } from "react-native";

interface TextFieldProps extends TextInputProps {
  test?: string;
}

export const TextField = ({ className, ...rest }: TextFieldProps) => {
  return (
    <TextInput
      {...rest}
      placeholderTextColor="#71717a"
      className="border-gray-700 bg-gray-800 mt-6 rounded-lg border-2 px-4 py-3 text-white"
    />
  );
};
