import { Text } from "react-native";

interface LoadingTextProps {
  text?: string;
}

export const LoadingText = ({ text = "Loading..." }: LoadingTextProps) => {
  return <Text className="mt-4 w-full text-center text-gray-400">{text}</Text>;
};
