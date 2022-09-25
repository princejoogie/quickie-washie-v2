import { useEffect, useState } from "react";
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  RefreshControl,
  View,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronIcon } from "./icon/chevron-icon";

interface Props {
  children: React.ReactNode;
  customNav?: React.ReactNode;
  className?: string;
  onRefresh?: () => Promise<any> | any;
  noPadding?: boolean;
  nav?: {
    title: string;
    canGoBack?: boolean;
    onBack?: () => void;
    actions?: React.ReactNode;
  };
}

export const Layout = ({
  children,
  nav,
  onRefresh,
  className = "",
  noPadding = false,
}: Props) => {
  const { top, bottom } = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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

        <FlatList
          data={[1]}
          renderItem={() => (
            <View
              className={`flex-1 flex-col ${className} ${
                noPadding ? "px-0" : "px-4"
              }`}
              style={{ paddingBottom: bottom + keyboardHeight }}
            >
              {children}
              <View className="h-20" />
            </View>
          )}
          refreshControl={
            onRefresh && (
              <RefreshControl
                colors={["#1f2937"]}
                tintColor="#ffffff"
                titleColor="#ffffff"
                refreshing={refreshing}
                onRefresh={async () => {
                  setRefreshing(true);
                  await onRefresh();
                  setRefreshing(false);
                }}
              />
            )
          }
        />
      </>
    </TouchableWithoutFeedback>
  );
};
