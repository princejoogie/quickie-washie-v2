import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Platform } from "expo-modules-core";
import { TouchableOpacity, View } from "react-native";
import { AdminDashboardParamKeys } from "../pages/dashboard/admin/types";
import { CalendarIcon } from "./icon/calendar-icon";
import { MegaphoneIcon } from "./icon/megaphone-icon";
import { PieChartIcon } from "./icon/pie-chart-icon";
import { ToolIcon } from "./icon/tool-icon";
import { UserIcon } from "./icon/user-icon";

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
    case AdminDashboardParamKeys.BugReports:
      return (
        <MegaphoneIcon
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
      className="flex flex-row items-center justify-evenly rounded-t-3xl bg-gray-800"
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
