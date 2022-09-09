import React from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className = "" }: Props) => {
  const { top } = useSafeAreaInsets();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          paddingTop: top,
        }}
        className={`bg-gray-900 flex-1 ${className}`}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};
