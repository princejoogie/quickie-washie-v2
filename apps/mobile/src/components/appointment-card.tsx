import type { GetAllAppointmentsResponse } from "@qw/dto";
import { TouchableOpacity, Text, View } from "react-native";
import { format } from "date-fns";

interface AppointmentCardProps {
  onClick: () => void;
  appointment: GetAllAppointmentsResponse[number];
}

export const AppointmentCard = ({
  appointment,
  onClick,
}: AppointmentCardProps) => {
  const date = new Date(appointment.date);
  const vehicle = appointment.Vehicle;

  return (
    <TouchableOpacity
      key={appointment.id}
      onPress={onClick}
      className="border-gray-700 bg-gray-800 mt-3 rounded-xl border-2 relative p-3"
    >
      <Text className="text-white text-lg font-bold">
        {appointment.Service?.name}
      </Text>
      <Text className="text-gray-400 text-xs">
        {format(date, "MMM d, yyyy")}
      </Text>
      <Text className="text-gray-400 text-xs">{format(date, "hh:mm aa")}</Text>

      <View className="bg-green-600 border border-green-500 rounded px-2 absolute top-1 right-1">
        <Text className="text-white text-xs">{appointment.status}</Text>
      </View>

      <View className="border-gray-700 bg-gray-800 mt-3 rounded-lg border-2 relative">
        <View className="flex flex-row items-center p-3">
          <View className="h-12 w-12 rounded-full bg-pink-600 mr-2" />

          <View className="flex-1">
            <Text
              style={{ flex: 1 }}
              className="text-lg text-gray-200 font-bold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {vehicle?.plateNumber}
            </Text>

            <Text
              style={{ flex: 1 }}
              className="text-gray-400 text-xs"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {vehicle?.model}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
