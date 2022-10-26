import { Picker } from "@react-native-picker/picker";
import { useQuery } from "@tanstack/react-query";
import { getDaysInMonth } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

import appointmentService from "../services/appointment";
import { getServerConstants } from "../utils/constants";
import { isAllowedForBooking } from "../utils/helpers";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export interface DatePickerProps {
  onChange?: (date: Date, isAllowed: boolean) => void;
  value: Date;
  serviceId: string;
}

export const DatePicker = ({ onChange, value, serviceId }: DatePickerProps) => {
  const appointments = useQuery(["appointments"], appointmentService.getAll);
  const serverConstants = useQuery(["server-constants"], getServerConstants);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const [year, setYear] = useState(value.getFullYear());
  const [month, setMonth] = useState(value.getMonth());
  const [day, setDay] = useState(value.getDate());

  const date = useMemo(() => new Date(year, month, day), [year, month, day]);
  const days = getDaysInMonth(date);

  useEffect(() => {
    onChange?.(
      date,
      isAllowedForBooking({
        date,
        serviceId,
        apts: appointments.data ?? [],
        maxBookingsPerDay: serverConstants.data?.maxBookings ?? 5,
      }).isAllowed
    );
  }, [date]);

  const isLoading = appointments.isLoading || serverConstants.isLoading;

  return isLoading ? (
    <Text className="text-center text-white">Loading Server constants...</Text>
  ) : (
    <View className="flex flex-row">
      <View className="flex-1">
        <Picker
          itemStyle={{ color: "white" }}
          style={{
            color: "white",
            backgroundColor: "#1f2937",
            borderRadius: 10,
            marginRight: 2.5,
          }}
          mode="dialog"
          selectedValue={month}
          onValueChange={(e) => {
            setMonth(e);
            setDay(1);
          }}
        >
          {months.map((month, idx) => (
            <Picker.Item key={month} label={month} value={idx} />
          ))}
        </Picker>
        <Text className="mt-1 ml-2 text-xs text-gray-400">Month</Text>
      </View>

      <View className="flex-1">
        <Picker
          itemStyle={{ color: "white" }}
          style={{
            color: "white",
            backgroundColor: "#1f2937",
            borderRadius: 10,
            marginRight: 2.5,
            marginLeft: 2.5,
          }}
          mode="dialog"
          selectedValue={day}
          onValueChange={(e) => {
            setDay(e);
          }}
        >
          {Array(days)
            .fill(0)
            .map((_, idx) => {
              const allowed = isAllowedForBooking({
                serviceId,
                date: new Date(year, month, idx + 1),
                apts: appointments.data ?? [],
                maxBookingsPerDay: serverConstants.data?.maxBookings ?? 5,
              });
              return (
                <Picker.Item
                  style={{ color: allowed.isAllowed ? "#000000" : "#d1d5db" }}
                  enabled={allowed.isAllowed}
                  key={`day-${idx}`}
                  label={`${idx + 1} ${
                    allowed.numberOfBookings > 0
                      ? `(${allowed.numberOfBookings} booking/s)`
                      : ""
                  }`}
                  value={idx + 1}
                />
              );
            })}
        </Picker>
        {!isAllowedForBooking({
          date,
          serviceId,
          apts: appointments.data ?? [],
          maxBookingsPerDay: serverConstants.data?.maxBookings ?? 5,
        }).isAllowed ? (
          <Text className="mt-1 ml-2 text-xs italic text-red-600">Invalid</Text>
        ) : (
          <Text className="mt-1 ml-2 text-xs text-gray-400">Day</Text>
        )}
      </View>

      <View className="flex-1">
        <Picker
          itemStyle={{ color: "white" }}
          style={{
            color: "white",
            backgroundColor: "#1f2937",
            borderRadius: 10,
            marginLeft: 2.5,
          }}
          mode="dialog"
          selectedValue={year}
          onValueChange={(e) => {
            setYear(e);
          }}
        >
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Picker.Item
                key={`year-${currentYear + i}`}
                label={`${currentYear + i}`}
                value={currentYear + i}
              />
            ))}
        </Picker>
        <Text className="mt-1 ml-2 text-xs text-gray-400">Year</Text>
      </View>
    </View>
  );
};
