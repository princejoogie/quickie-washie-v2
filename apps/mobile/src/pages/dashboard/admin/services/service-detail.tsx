import { useState } from "react";
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

import { Layout, TextField, VehicleTypeModal } from "../../../../components";
import servicesService from "../../../../services/services";
import { PlusIcon } from "../../../../components/icon/plus-icon";
import { IVehicleType } from "../../../../constants";

export const ServiceDetail = ({
  route,
  navigation,
}: NativeStackScreenProps<ServicesStackParamList, "ServiceDetail">) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeAPIndex, setActiveAPIndex] = useState(0);
  const { serviceId } = route.params;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ServiceBodySchema>({
    mode: "all",
    resolver: zodResolver(serviceBodySchema),
    defaultValues: {
      additionalPrices: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalPrices",
  });

  const serviceDetails = useQuery(
    ["service", serviceId],
    (e) => servicesService.getById({ serviceId: e.queryKey[1] }),
    {
      onSuccess: (data) => {
        setValue("name", data.name);
        setValue("description", data.description);
        setValue("basePrice", data.basePrice.toString());
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
      navigation.goBack();
    },
  });
  const deleteService = useMutation(servicesService.deleteService, {
    onSuccess: () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    },
  });

  return (
    <Layout
      nav={{
        title: "Service Detail",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
        actions: (
          <TouchableOpacity
            onPress={handleSubmit(
              async ({ basePrice, additionalPrices, ...rest }) => {
                await updateService.mutateAsync({
                  params: {
                    serviceId,
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

                await serviceDetails.refetch();
              }
            )}
          >
            <Text className="text-blue-600 font-bold">Update</Text>
          </TouchableOpacity>
        ),
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
        <View key={field.id} className="ml-4">
          <View className="flex flex-row items-center justify-between mt-3">
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
              render={({ field: { value } }) => (
                <TouchableOpacity
                  className="rounded-lg border-2 px-4 py-3 items-center justify-center border-gray-700 bg-gray-800 mt-1 mr-1 grow-0 w-2/3"
                  onPress={() => {
                    setActiveAPIndex(idx);
                    setModalVisible(true);
                  }}
                >
                  <Text className="text-gray-400 ml-2 p-0">
                    {!!value ? value : "Vehicle type"}
                  </Text>
                </TouchableOpacity>
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

      <VehicleTypeModal
        key={`vehicle-type-${activeAPIndex}`}
        visible={modalVisible}
        disabledKeys={watch("additionalPrices").map(
          (e) => e.vehicleType as IVehicleType
        )}
        onDismiss={(type) => {
          setValue(`additionalPrices.${activeAPIndex}.vehicleType`, type);
          setModalVisible(false);
        }}
        closeModal={() => {
          setModalVisible(false);
        }}
      />

      <TouchableOpacity
        className="self-end mt-6 disabled:opacity-50"
        disabled={deleteService.isLoading}
        onPress={() => {
          deleteService.mutate({ serviceId });
        }}
      >
        <Text className="text-red-600 font-bold">Delete service</Text>
      </TouchableOpacity>
    </Layout>
  );
};
