import { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useLinkProps } from "@react-navigation/native";

type GetParams<T> = T extends undefined
  ? undefined
  : T extends (...args: any[]) => any
  ? Parameters<T>[0]
  : T extends { params: infer P }
  ? P
  : undefined;

interface LinkButtonProps {
  children: ReactNode;
  linkProps: GetParams<typeof useLinkProps>;
}

export const LinkButton = ({ children, linkProps }: LinkButtonProps) => {
  const { onPress, ...props } = useLinkProps({
    to: linkProps.to,
    action: linkProps.action,
  });

  return (
    <TouchableOpacity {...props} onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};
