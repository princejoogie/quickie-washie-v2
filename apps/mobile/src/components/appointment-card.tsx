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
      className="relative mt-3 rounded-xl border-2 border-gray-700 bg-gray-800 p-3"
    >
      <Text
        className={`font-bold ${
          appointment.Service
            ? "text-lg text-white"
            : "text-sm italic text-red-600"
        }`}
      >
        {appointment.Service?.name ?? "Unknown Service"}
      </Text>
      <Text className="text-xs text-gray-400">
        {format(date, "MMM d, yyyy")}
      </Text>
      <Text className="text-xs text-gray-400">{format(date, "hh:mm aa")}</Text>

      <View className="absolute top-1 right-1 rounded border border-green-500 bg-green-600 px-2">
        <Text className="text-xs text-white">{appointment.status}</Text>
      </View>

      <VehicleCard vehicle={vehicle ?? undefined} />
    </TouchableOpacity>
  );
};
