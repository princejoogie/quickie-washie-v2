import { useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  RefreshControl,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronIcon } from "./icon/chevron-icon";

interface Props {
  children: React.ReactNode;
  customNav?: React.ReactNode;
  className?: string;
  onRefresh?: () => Promise<any>;
  nav?: {
    title: string;
    canGoBack?: boolean;
    onBack?: () => void;
    actions?: React.ReactNode;
  };
}

export const Layout = ({ children, nav, onRefresh, className = "" }: Props) => {
  const { top, bottom } = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

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

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              size={20}
              colors={["#ffffff"]}
              tintColor="#ffffff"
              titleColor="#ffffff"
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                await onRefresh?.();
                setRefreshing(false);
              }}
            />
          }
        >
          <View className={`flex bg-gray-900 px-6 flex-1 ${className}`}>
            {children}
            <View style={{ height: bottom * 3 }} />
          </View>
        </ScrollView>
      </>
    </TouchableWithoutFeedback>
  );
};
