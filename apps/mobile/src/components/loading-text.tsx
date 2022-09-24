import { Text } from "react-native";

interface LoadingTextProps {
  text?: string;
}

export const LoadingText = ({ text = "Loading..." }: LoadingTextProps) => {
  return <Text className="w-full text-center text-gray-400 mt-4">{text}</Text>;
};
