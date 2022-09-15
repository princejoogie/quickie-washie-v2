import { View, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { AdminDashboardParamKeys } from "../pages/dashboard/admin/types";
import { CalendarIcon } from "./icon/calendar-icon";
import { NotificationIcon } from "./icon/notification-icon";
import { UserIcon } from "./icon/user-icon";
import { Platform } from "expo-modules-core";
import { ToolIcon } from "./icon/tool-icon";
import { PieChartIcon } from "./icon/pie-chart-icon";

const GetIcon = ({
  name,
  active = false,
}: {
  name: AdminDashboardParamKeys;
  active: boolean;
}) => {
  switch (name) {
    case AdminDashboardParamKeys.Analytics:
      return (
        <PieChartIcon
          filled={active}
          styleName={`${active ? "text-green-500" : "text-gray-400"}`}
        />
      );
    case AdminDashboardParamKeys.Services:
      return (
        <ToolIcon
          filled={active}
          styleName={`${active ? "text-green-500" : "text-gray-400"}`}
        />
      );
    case AdminDashboardParamKeys.Appointments:
      return (
        <CalendarIcon
          filled={active}
          styleName={`${active ? "text-green-500" : "text-gray-400"}`}
        />
      );
    case AdminDashboardParamKeys.Notifications:
      return (
        <NotificationIcon
          filled={active}
          styleName={`${active ? "text-green-500" : "text-gray-400"}`}
        />
      );
    case AdminDashboardParamKeys.Profile:
      return (
        <UserIcon
          filled={active}
          styleName={`${active ? "text-green-500" : "text-gray-400"}`}
        />
      );
  }
};

export const AdminTabBar = ({
  insets,
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View
      className="bg-gray-800 flex flex-row rounded-t-3xl items-center justify-evenly"
      style={{
        paddingBottom: Platform.OS === "android" ? 25 : insets.bottom,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            disabled={isFocused}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            className="pt-6"
          >
            <GetIcon
              name={route.name as AdminDashboardParamKeys}
              active={isFocused}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
