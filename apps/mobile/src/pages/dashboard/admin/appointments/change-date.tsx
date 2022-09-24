import { z } from "zod";
import { format } from "date-fns";
import { Text, Platform, TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import DateTimePicker, {
  DateTimePickerAndroid,
  AndroidNativeProps,
} from "@react-native-community/datetimepicker";

import { AdminAppointmentMessagesStackParamList } from "./types";
import { Layout } from "../../../../components";
import { useMutation } from "@tanstack/react-query";
import appointmentService from "../../../../services/appointment";

const changeDateSchema = z.object({
  date: z.date(),
});

type ChangeDateSchema = z.infer<typeof changeDateSchema>;

export const ChangeDate = ({
  route,
  navigation,
}: NativeStackScreenProps<
  AdminAppointmentMessagesStackParamList,
  "ChangeDate"
>) => {
  const { appointmentId, date: dateString } = route.params;
  const date = new Date(dateString);

  const { control, watch, setValue, handleSubmit } = useForm<ChangeDateSchema>({
    defaultValues: { date },
  });

  const updateAppointment = useMutation(appointmentService.update, {
    onSuccess: () => {
      navigation.goBack();
    },
  });

  const showMode = (currentMode: AndroidNativeProps["mode"]) => {
    const value = watch("date");
    DateTimePickerAndroid.open({
      minimumDate: new Date(),
      value: watch("date"),
      onChange: (_, date) => {
        if (date) {
          if (currentMode === "date") {
            const copy = new Date(date);
            copy.setHours(value.getHours());
            copy.setMinutes(value.getMinutes());
            copy.setSeconds(0);
            setValue("date", copy);
          } else {
            const copy = new Date(date);
            copy.setFullYear(value.getFullYear());
            copy.setMonth(value.getMonth());
            copy.setDate(value.getDate());
            copy.setSeconds(0);
            setValue("date", copy);
          }
        }
      },
      mode: currentMode,
    });
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const showTimePicker = () => {
    showMode("time");
  };

  return (
    <Layout
      nav={{
        title: "Change Date",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
      }}
    >
      <Text className="text-gray-400 text-xs ml-2 mt-4">Select date</Text>
      <Controller
        name="date"
        control={control}
        render={({ field: { onChange, value } }) =>
          Platform.OS === "ios" ? (
            <DateTimePicker
              minimumDate={new Date()}
              mode="date"
              display="inline"
              textColor="white"
              themeVariant="dark"
              value={value}
              onChange={(_, date) => {
                if (date) {
                  const copy = new Date(date);
                  copy.setHours(value.getHours());
                  copy.setMinutes(value.getMinutes());
                  copy.setSeconds(0);
                  onChange(copy);
                } else onChange(value);
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={showDatePicker}
              className="border-gray-700 bg-gray-800 mt-1 rounded-lg border-2 px-4 py-3"
            >
              <Text className="text-white">{format(value, "MMM d, yyyy")}</Text>
            </TouchableOpacity>
          )
        }
      />

      <Text className="text-gray-400 text-xs ml-2 mt-4">Select time</Text>
      <Controller
        name="date"
        control={control}
        render={({ field: { onChange, value } }) =>
          Platform.OS === "ios" ? (
            <DateTimePicker
              minimumDate={new Date()}
              minuteInterval={10}
              mode="time"
              display="spinner"
              textColor="white"
              themeVariant="dark"
              value={value}
              onChange={(_, date) => {
                if (date) {
                  const copy = new Date(date);
                  copy.setFullYear(value.getFullYear());
                  copy.setMonth(value.getMonth());
                  copy.setDate(value.getDate());
                  copy.setSeconds(0);
                  onChange(copy);
                } else onChange(value);
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={showTimePicker}
              className="border-gray-700 bg-gray-800 mt-1 rounded-lg border-2 px-4 py-3"
            >
              <Text className="text-white">{format(value, "hh:mm aa")}</Text>
            </TouchableOpacity>
          )
        }
      />

      <TouchableOpacity
        onPress={handleSubmit(({ date }) => {
          updateAppointment.mutate({
            body: { date: date.toISOString() },
            params: { appointmentId },
          });
        })}
        disabled={updateAppointment.isLoading}
        className={`bg-green-600 w-full mt-6 px-8 py-2 rounded-lg border-2 border-green-500 ${
          updateAppointment.isLoading ? "opacity-50" : ""
        }`}
      >
        <Text className="text-white text-center">Update appointment</Text>
      </TouchableOpacity>
    </Layout>
  );
};
