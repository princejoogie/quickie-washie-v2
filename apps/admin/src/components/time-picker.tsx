import { useMemo, useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";

import { getServerConstants } from "../utils/constants";

export interface TimePickerProps {
  onChange?: (date: Date) => void;
  value: Date;
}

export const TimePicker = ({ value, onChange }: TimePickerProps) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmpm] = useState<"AM" | "PM">("AM");

  const serverConstants = useQuery(["server-constants"], getServerConstants, {
    onSuccess: (data) => {
      setHour(data.operatingHours.am.open);
    },
  });

  const date = useMemo(() => {
    const _date = new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
      hour,
      minute
    );

    return _date;
  }, [hour, minute, ampm]);

  useEffect(() => {
    onChange?.(date);
  }, [date]);

  return serverConstants.isLoading ? (
    <Text className="text-center text-white">Loading Server constants...</Text>
  ) : !!serverConstants.data ? (
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
          selectedValue={hour}
          onValueChange={setHour}
        >
          {ampm === "AM"
            ? Array(
                serverConstants.data.operatingHours.am.close +
                  1 -
                  serverConstants.data.operatingHours.am.open
              )
                .fill(0)
                .map((_, idx) => {
                  return (
                    <Picker.Item
                      key={`am-hr-${idx}`}
                      label={`${
                        idx + serverConstants.data.operatingHours.am.open
                      }`}
                      value={idx + serverConstants.data.operatingHours.am.open}
                    />
                  );
                })
            : Array(
                serverConstants.data.operatingHours.pm.close +
                  1 -
                  serverConstants.data.operatingHours.pm.open
              )
                .fill(0)
                .map((_, idx) => {
                  return (
                    <Picker.Item
                      key={`pm-hr-${idx}`}
                      label={`${
                        idx + serverConstants.data.operatingHours.pm.open - 12
                      }`}
                      value={idx + serverConstants.data.operatingHours.pm.open}
                    />
                  );
                })}
        </Picker>
        <Text className="mt-1 ml-2 text-xs text-gray-400">Hours</Text>
      </View>

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
          selectedValue={minute}
          onValueChange={setMinute}
        >
          {Array(60 / 5)
            .fill(0)
            .map((_, idx) => (
              <Picker.Item
                key={`minute-${idx * 5}`}
                label={(idx * 5).toString().padStart(2, "0")}
                value={idx * 5}
              />
            ))}
        </Picker>
        <Text className="mt-1 ml-2 text-xs text-gray-400">Minutes</Text>
      </View>

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
          selectedValue={ampm}
          onValueChange={(e) => {
            setAmpm(e);
            if (e === "AM") {
              setHour(serverConstants.data.operatingHours.am.open);
            } else {
              setHour(serverConstants.data.operatingHours.pm.open);
            }
          }}
        >
          <Picker.Item key={"AM"} label="AM" value="AM" />
          <Picker.Item key={"PM"} label="PM" value="PM" />
        </Picker>
      </View>
    </View>
  ) : (
    <Text className="text-center text-xs italic text-red-600">
      Server error...
    </Text>
  );
};
