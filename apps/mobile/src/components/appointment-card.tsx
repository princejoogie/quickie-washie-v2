import type { GetAllAppointmentsResponse } from "@qw/dto";
import { TouchableOpacity, Text, View } from "react-native";
import { format } from "date-fns";
import { VehicleCard } from "./vehicle-card";

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
      <Text
        className={`font-bold ${
          appointment.Service
            ? "text-lg text-white"
            : "text-sm text-red-600 italic"
        }`}
      >
        {appointment.Service?.name ?? "Unknown Service"}
      </Text>
      <Text className="text-gray-400 text-xs">
        {format(date, "MMM d, yyyy")}
      </Text>
      <Text className="text-gray-400 text-xs">{format(date, "hh:mm aa")}</Text>

      <View className="bg-green-600 border border-green-500 rounded px-2 absolute top-1 right-1">
        <Text className="text-white text-xs">{appointment.status}</Text>
      </View>

      <VehicleCard vehicle={vehicle ?? undefined} />
    </TouchableOpacity>
  );
};
