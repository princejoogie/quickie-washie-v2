import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { TouchableOpacity, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { z } from "zod";

import { ServicesStackParamList } from "./types";

import { Layout, TextField } from "../../../../components";
import { queryClient } from "../../../../services/api";
import servicesService from "../../../../services/services";
import { PlusIcon } from "../../../../components/icon/plus-icon";

const createServiceBodySchema = z.object({
  name: z.string().min(1, { message: "Invalid name" }).max(255),
  basePrice: z.string().min(1, { message: "Should be greater than 0" }),
  description: z.string().min(1, { message: "Invalid description" }).max(255),
  additionalPrices: z.array(
    z.object({
      price: z.string().min(1, { message: "Should be greater than 0" }),
      vehicleType: z
        .string()
        .min(1, { message: "Invalid Vehicle type" })
        .max(255),
    })
  ),
});

type CreateServiceBody = z.infer<typeof createServiceBodySchema>;

export const NewService = ({
  navigation,
}: NativeStackScreenProps<ServicesStackParamList, "NewService">) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateServiceBody>({
    mode: "all",
    resolver: zodResolver(createServiceBodySchema),
    defaultValues: {
      additionalPrices: [],
      basePrice: "",
      description: "",
      name: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalPrices",
  });

  const createService = useMutation(servicesService.create, {
    onSuccess: () => {
      if (navigation.canGoBack()) {
        queryClient.invalidateQueries(["services"]);
        navigation.goBack();
      }
    },
  });

  return (
    <Layout
      nav={{
        title: "New Service",
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
          return createService.mutateAsync({
            ...rest,
            basePrice: parseFloat(basePrice),
            additionalPrices: additionalPrices.map((price) => ({
              ...price,
              price: parseFloat(price.price),
            })),
          });
        })}
      >
        <Text className="text-white">Submit</Text>
      </TouchableOpacity>
    </Layout>
  );
};
