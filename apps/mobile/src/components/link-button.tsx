import { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useLinkProps } from "@react-navigation/native";

interface LinkButtonProps {
  children: ReactNode;
  to: string;
  action: {
    type: "NAVIGATE";
    payload: {
      name: string;
      params?: Record<string, unknown>;
    };
  };
}

export const LinkButton = ({ children, to, action }: LinkButtonProps) => {
  const { onPress, ...props } = useLinkProps({ to, action });

  return (
    <TouchableOpacity {...props} onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};
