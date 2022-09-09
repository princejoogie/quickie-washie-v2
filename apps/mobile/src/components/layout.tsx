import React from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronIcon } from "./icon/chevron-icon";

interface Props {
  children: React.ReactNode;
  customNav?: React.ReactNode;
  className?: string;
  nav?: {
    title: string;
    canGoBack?: boolean;
    onBack?: () => void;
    actions?: React.ReactNode;
  };
}

export const Layout = ({ children, nav, className = "" }: Props) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <View style={{ height: top }} />
        {nav && (
          <View className="p-4 border-b-2 border-gray-800 flex flex-row items-center justify-between">
            <View className="flex flex-row items-center">
              {nav.canGoBack && (
                <TouchableOpacity
                  className="self-start flex-row items-center w-auto mr-2"
                  onPress={nav.onBack}
                >
                  <ChevronIcon
                    strokeWidth={2}
                    direction="left"
                    styleName="h-7 w-7 text-white"
                  />
                </TouchableOpacity>
              )}
              <Text className="text-white font-bold text-lg">{nav.title}</Text>
            </View>

            {nav.actions && nav.actions}
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className={`flex bg-gray-900 px-6 flex-1 ${className}`}>
            {children}
            <View style={{ height: bottom * 3 }} />
          </View>
        </ScrollView>
      </>
    </TouchableWithoutFeedback>
  );
};
