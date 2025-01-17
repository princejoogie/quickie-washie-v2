import { useEffect, useState } from "react";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Text, TouchableOpacity } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  DatePicker,
  Layout,
  TextField,
  TimePicker,
} from "../../../../components";
import servicesService from "../../../../services/services";

import { HomeStackParamList } from "./types";
import vehiclesService from "../../../../services/vehicles";
import { useAuthContext } from "../../../../contexts/auth-context";
import appointmentService from "../../../../services/appointment";
import { CustomerDashboardParamList } from "../types";

const bookServiceSchema = z.object({
  serviceId: z.string().cuid(),
  vehicleId: z.string().cuid(),
  additionalPriceId: z.string().cuid().nullable(),
  userId: z.string().cuid(),
  date: z.date(),
});

type BookServiceSchema = z.infer<typeof bookServiceSchema>;

export const BookService = ({
  route,
  navigation,
}: NativeStackScreenProps<HomeStackParamList, "BookService">) => {
  const [isValidDate, setIsValidDate] = useState(false);
  const { data } = useAuthContext();
  const { serviceId } = route.params;
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { isValidating },
  } = useForm<BookServiceSchema>({
    resolver: zodResolver(bookServiceSchema),
    defaultValues: {
      serviceId,
      vehicleId: "",
      additionalPriceId: "",
      userId: "",
      date: new Date(),
    },
  });

  useEffect(() => {
    if (data?.id) {
      setValue("userId", data.id);
    }
  }, [data?.id]);

  const serviceDetails = useQuery(["serviceDetails", serviceId], (e) =>
    servicesService.getById({ serviceId: e.queryKey[1] })
  );

  const vehicles = useQuery(["vehicles"], vehiclesService.getAll, {
    onSuccess: (data) => {
      if (data.length > 0) {
        setValue("vehicleId", data[0].id);
      }
    },
  });

  const createAppointment = useMutation(appointmentService.create, {
    onSuccess: () => {
      navigation
        .getParent<
          BottomTabNavigationProp<CustomerDashboardParamList, "Home">
        >()
        .navigate("Appointments");
    },
  });

  const isLoading =
    serviceDetails.isLoading ||
    vehicles.isLoading ||
    createAppointment.isLoading ||
    isValidating;

  /* const showMode = (currentMode: AndroidNativeProps["mode"]) => { */
  /*   const value = watch("date"); */
  /*   DateTimePickerAndroid.open({ */
  /*     minimumDate: new Date(), */
  /*     value: watch("date"), */
  /*     onChange: (_, date) => { */
  /*       if (date) { */
  /*         if (currentMode === "date") { */
  /*           const copy = new Date(date); */
  /*           copy.setHours(value.getHours()); */
  /*           copy.setMinutes(value.getMinutes()); */
  /*           copy.setSeconds(0); */
  /*           setValue("date", copy); */
  /*         } else { */
  /*           const copy = new Date(date); */
  /*           copy.setFullYear(value.getFullYear()); */
  /*           copy.setMonth(value.getMonth()); */
  /*           copy.setDate(value.getDate()); */
  /*           copy.setSeconds(0); */
  /*           setValue("date", copy); */
  /*         } */
  /*       } */
  /*     }, */
  /*     mode: currentMode, */
  /*   }); */
  /* }; */

  /* const showDatePicker = () => { */
  /*   showMode("date"); */
  /* }; */

  /* const showTimePicker = () => { */
  /*   showMode("time"); */
  /* }; */

  const getAdditionalPrice = () => {
    if (vehicles.data && serviceDetails.data) {
      const vehicle = vehicles.data.find((e) => e.id === watch("vehicleId"));
      if (vehicle) {
        const additionalPrice = serviceDetails.data.additionalPrices.find(
          (e) => e.vehicleType === vehicle.type
        );

        if (additionalPrice) {
          return {
            id: additionalPrice.id,
            value: additionalPrice.price.toString(),
          };
        }
      }
    }

    return {
      id: null,
      value: "0.00",
    };
  };

  setValue("additionalPriceId", getAdditionalPrice().id);

  return (
    <Layout
      nav={{
        title: "Book Service",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
      }}
    >
      <TextField
        multiline
        editable={false}
        label="Service Name"
        value={serviceDetails.data?.name}
      />

      <TextField
        multiline
        editable={false}
        label="Description"
        value={serviceDetails.data?.description}
      />

      <TextField
        editable={false}
        label="Base price"
        value={`₱ ${serviceDetails.data?.basePrice.toString() ?? "0.00"}`}
      />

      <Text className="ml-2 mb-2 mt-4 text-xs text-gray-400">
        Select your vehicle
      </Text>
      {vehicles.data && vehicles.data.length > 0 ? (
        <Controller
          name="vehicleId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              {vehicles.data && vehicles.data.length > 0 && (
                <Picker
                  itemStyle={{ color: "white" }}
                  style={{
                    color: "white",
                    backgroundColor: "#1f2937",
                    borderRadius: 10,
                  }}
                  mode="dialog"
                  selectedValue={value}
                  onValueChange={(e) => {
                    onChange(e);
                  }}
                >
                  {vehicles.data.map((e) => (
                    <Picker.Item
                      key={e.id}
                      label={e.plateNumber}
                      value={e.id}
                    />
                  ))}
                </Picker>
              )}
            </>
          )}
        />
      ) : (
        <Text className="ml-2 mt-1 italic text-red-600">
          No vehicles found. Please add a vehicle first.
        </Text>
      )}
      <TextField
        editable={false}
        label="Additional price (auto calculated)"
        value={`₱ ${getAdditionalPrice().value}`}
      />

      <Text className="ml-2 mb-2 mt-4 text-xs text-gray-400">Select date</Text>

      <Controller
        name="date"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            serviceId={serviceId}
            onChange={(date, isAllowed) => {
              const copy = new Date(date);
              copy.setHours(value.getHours());
              copy.setMinutes(value.getMinutes());
              copy.setSeconds(0);
              onChange(copy);
              setIsValidDate(isAllowed);
            }}
            value={value}
          />
        )}
      />

      <Text className="ml-2 mt-4 text-xs text-gray-400">Select time</Text>

      <Controller
        name="date"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TimePicker
            onChange={(date) => {
              const copy = new Date(date);
              copy.setFullYear(value.getFullYear());
              copy.setMonth(value.getMonth());
              copy.setDate(value.getDate());
              copy.setSeconds(0);
              onChange(copy);
            }}
            value={value}
          />
        )}
      />

      {/* <Text className="text-white"> */}
      {/*   {format(watch("date"), "yyyy-MM-dd HH:mm:SS")} */}
      {/* </Text> */}

      {/* <Controller */}
      {/*   name="date" */}
      {/*   control={control} */}
      {/*   render={({ field: { onChange, value } }) => */}
      {/*     Platform.OS === "ios" ? ( */}
      {/*       <DateTimePicker */}
      {/*         minimumDate={new Date()} */}
      {/*         mode="date" */}
      {/*         display="inline" */}
      {/*         textColor="white" */}
      {/*         themeVariant="dark" */}
      {/*         value={value} */}
      {/*         onChange={(_, date) => { */}
      {/*           if (date) { */}
      {/*             const copy = new Date(date); */}
      {/*             copy.setHours(value.getHours()); */}
      {/*             copy.setMinutes(value.getMinutes()); */}
      {/*             copy.setSeconds(0); */}
      {/*             onChange(copy); */}
      {/*           } else onChange(value); */}
      {/*         }} */}
      {/*       /> */}
      {/*     ) : ( */}
      {/*       <TouchableOpacity */}
      {/*         onPress={showDatePicker} */}
      {/*         className="mt-1 rounded-lg border-2 border-gray-700 bg-gray-800 px-4 py-3" */}
      {/*       > */}
      {/*         <Text className="text-white">{format(value, "MMM d, yyyy")}</Text> */}
      {/*       </TouchableOpacity> */}
      {/*     ) */}
      {/*   } */}
      {/* /> */}

      {/* <Controller */}
      {/*   name="date" */}
      {/*   control={control} */}
      {/*   render={({ field: { onChange, value } }) => */}
      {/*     Platform.OS === "ios" ? ( */}
      {/*       <DateTimePicker */}
      {/*         minimumDate={new Date()} */}
      {/*         minuteInterval={10} */}
      {/*         mode="time" */}
      {/*         display="spinner" */}
      {/*         textColor="white" */}
      {/*         themeVariant="dark" */}
      {/*         value={value} */}
      {/*         onChange={(_, date) => { */}
      {/*           if (date) { */}
      {/*             const copy = new Date(date); */}
      {/*             copy.setFullYear(value.getFullYear()); */}
      {/*             copy.setMonth(value.getMonth()); */}
      {/*             copy.setDate(value.getDate()); */}
      {/*             copy.setSeconds(0); */}
      {/*             onChange(copy); */}
      {/*           } else onChange(value); */}
      {/*         }} */}
      {/*       /> */}
      {/*     ) : ( */}
      {/*       <TouchableOpacity */}
      {/*         onPress={showTimePicker} */}
      {/*         className="mt-1 rounded-lg border-2 border-gray-700 bg-gray-800 px-4 py-3" */}
      {/*       > */}
      {/*         <Text className="text-white">{format(value, "hh:mm aa")}</Text> */}
      {/*       </TouchableOpacity> */}
      {/*     ) */}
      {/*   } */}
      {/* /> */}

      <TouchableOpacity
        onPress={() => {
          if (isValidDate) {
            handleSubmit(({ date, ...rest }) => {
              createAppointment.mutate({
                ...rest,
                date: date.toISOString(),
              });
            })();
          }
        }}
        disabled={isLoading}
        className={`mt-6 w-full rounded-lg border-2 border-green-500 bg-green-600 px-8 py-2 ${
          isLoading ? "opacity-50" : "opacity-100"
        }`}
      >
        <Text className="text-center text-white">Book Service</Text>
      </TouchableOpacity>
    </Layout>
  );
};
