import { useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { TouchableOpacity, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  ServiceBodySchema,
  serviceBodySchema,
  ServicesStackParamList,
} from "./types";

import { Layout, TextField } from "../../../../components";
import { queryClient } from "../../../../services/api";
import servicesService from "../../../../services/services";
import { PlusIcon } from "../../../../components/icon/plus-icon";

export const ServiceDetail = ({
  route,
  navigation,
}: NativeStackScreenProps<ServicesStackParamList, "ServiceDetail">) => {
  const props = route.params;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ServiceBodySchema>({
    mode: "all",
    resolver: zodResolver(serviceBodySchema),
    defaultValues: {
      additionalPrices: [],
      basePrice: props.basePrice.toString(),
      description: props.description,
      name: props.name,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalPrices",
  });

  const serviceDetails = useQuery(
    ["service", props.id],
    (e) => servicesService.getById({ serviceId: e.queryKey[1] }),
    {
      onSuccess: (data) => {
        setValue(
          "additionalPrices",
          data.additionalPrices.map((e) => ({
            vehicleType: e.vehicleType,
            price: e.price.toString(),
          }))
        );
      },
    }
  );

  const updateService = useMutation(servicesService.update, {
    onSuccess: () => {
      serviceDetails.refetch();
      /* if (navigation.canGoBack()) { */
      /* queryClient.invalidateQueries(["services"]); */
      /* navigation.goBack(); */
      /* } */
    },
  });

  return (
    <Layout
      nav={{
        title: "Service Detail",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
      }}
    >
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange, ...rest } }) => (
          <TextField
            {...rest}
            placeholder="Oil change"
            label="Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && (
        <Text className="text-xs text-red-600 ml-2 mt-1">
          {errors.name.message}
        </Text>
      )}

      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange, ...rest } }) => (
          <TextField
            {...rest}
            placeholder="Description"
            label="Description"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.description && (
        <Text className="text-xs text-red-600 ml-2 mt-1">
          {errors.description.message}
        </Text>
      )}

      <Controller
        control={control}
        name="basePrice"
        render={({ field: { value, onChange, ...rest } }) => (
          <TextField
            {...rest}
            placeholder="0.00"
            keyboardType="numeric"
            label="Base price"
            value={`${value}`}
            onChangeText={onChange}
          />
        )}
      />
      {errors.basePrice && (
        <Text className="text-xs text-red-600 ml-2 mt-1">
          {errors.basePrice.message}
        </Text>
      )}

      <View className="flex flex-row items-center justify-between mt-4">
        <Text className="text-gray-400 text-xs ml-2">Additional prices</Text>
        <TouchableOpacity
          onPress={() => {
            append({ price: "", vehicleType: "" });
          }}
        >
          <PlusIcon />
        </TouchableOpacity>
      </View>

      {fields.map((field, idx) => (
        <View key={field.id} className="mt-2 ml-4">
          <View className="flex flex-row items-center justify-between mt-4">
            <Text className="text-gray-400 text-xs ml-2">
              Additional {idx + 1}
            </Text>

            <TouchableOpacity
              onPress={() => {
                remove(idx);
              }}
            >
              <Text className="text-xs text-red-600">Remove</Text>
            </TouchableOpacity>
          </View>

          <View className="flex flex-row">
            <Controller
              name={`additionalPrices.${idx}.vehicleType`}
              control={control}
              render={({ field: { value, onChange, ...rest } }) => (
                <TextField
                  {...rest}
                  containerClassname="mt-0 mr-1 grow-0 w-2/3"
                  placeholder="SUV"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              name={`additionalPrices.${idx}.price`}
              control={control}
              render={({ field: { value, onChange, ...rest } }) => (
                <TextField
                  {...rest}
                  containerClassname="mt-0 mr-1 grow-0 w-1/3"
                  placeholder="Price (0.00)"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.additionalPrices?.[idx]?.price?.message && (
            <Text className="text-xs text-red-600 ml-2 mt-1">
              - {errors.additionalPrices[idx]?.price?.message}
            </Text>
          )}
          {errors.additionalPrices?.[idx]?.vehicleType?.message && (
            <Text className="text-xs text-red-600 ml-2">
              - {errors.additionalPrices[idx]?.vehicleType?.message}
            </Text>
          )}
        </View>
      ))}

      <TouchableOpacity
        className="bg-green-600 self-end mt-6 px-8 py-2 rounded-lg border-2 border-green-500 disabled:opacity-50"
        onPress={handleSubmit(({ basePrice, additionalPrices, ...rest }) => {
          return updateService.mutateAsync({
            params: {
              serviceId: props.id,
            },
            body: {
              ...rest,
              basePrice: parseFloat(basePrice),
              additionalPrices: additionalPrices.map((price) => ({
                ...price,
                price: parseFloat(price.price),
              })),
            },
          });
        })}
      >
        <Text className="text-white">Submit</Text>
      </TouchableOpacity>
    </Layout>
  );
};
