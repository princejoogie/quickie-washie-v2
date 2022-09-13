import { View, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { DashboardParamKeys } from "../pages/dashboard/types";
import { HomeIcon } from "./icon/home-icon";
import { VehicleIcon } from "./icon/vehicle-icon";
import { CalendarIcon } from "./icon/calendar-icon";
import { NotificationIcon } from "./icon/notification-icon";
import { UserIcon } from "./icon/user-icon";

const GetIcon = ({
  name,
  active = false,
}: {
  name: DashboardParamKeys;
  active: boolean;
}) => {
  switch (name) {
    case DashboardParamKeys.Home:
      return (
        <HomeIcon
          filled={active}
          styleName={`${active ? "text-green-500" : "text-gray-400"}`}
        />
      );
    case DashboardParamKeys.Vehicles:
      return (
        <VehicleIcon
          filled={active}
          styleName={`${active ? "text-green-500" : "text-gray-400"}`}
        />
      );
    case DashboardParamKeys.Appointments:
      return (
        <CalendarIcon
          filled={active}
          styleName={`${active ? "text-green-500" : "text-gray-400"}`}
        />
      );
    case DashboardParamKeys.Notifications:
      return (
        <NotificationIcon
          filled={active}
          styleName={`${active ? "text-green-500" : "text-gray-400"}`}
        />
      );
    case DashboardParamKeys.Profile:
      return (
        <UserIcon
          filled={active}
          styleName={`${active ? "text-green-500" : "text-gray-400"}`}
        />
      );
  }
};

export const TabBar = ({
  insets,
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View
      className="bg-gray-800 flex flex-row rounded-t-3xl items-center justify-evenly"
      style={{ paddingBottom: insets.bottom }}
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
              name={route.name as DashboardParamKeys}
              active={isFocused}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
