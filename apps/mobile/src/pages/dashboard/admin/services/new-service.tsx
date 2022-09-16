import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { z } from "zod";

import { ServicesStackParamList } from "./types";

import { Layout, TextField } from "../../../../components";
import { queryClient } from "../../../../services/api";
import servicesService from "../../../../services/services";

const createServiceBodySchema = z.object({
  name: z.string().min(1).max(255),
  basePrice: z.number().min(0),
  description: z.string().min(1).max(255),
  additionalPrices: z.array(
    z.object({
      price: z.number().min(0),
      vehicleType: z.string(),
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
    formState: { errors, isValid, isDirty, isSubmitted, dirtyFields },
  } = useForm<CreateServiceBody>({
    resolver: zodResolver(createServiceBodySchema),
    defaultValues: {
      additionalPrices: [],
      basePrice: 0,
      description: "",
      name: "",
    },
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
      className="mt-4"
    >
      <Text className="text-white">
        {JSON.stringify(
          {
            errors,
            isValid,
            isDirty,
            isSubmitted,
            dirtyFields,
          },
          null,
          2
        )}
      </Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange, ...rest } }) => (
          <TextField
            {...rest}
            placeholder="Oil change"
            label="Plate Number"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange, ...rest } }) => (
          <TextField
            {...rest}
            placeholder="Description"
            label="Model"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.description && <Text>{errors.description.message}</Text>}

      <Controller
        control={control}
        name="basePrice"
        render={({ field: { value, onChange, ...rest } }) => (
          <TextField
            {...rest}
            placeholder="0.00"
            keyboardType="numeric"
            label="Model"
            value={`${value}`}
            onChangeText={onChange}
          />
        )}
      />
      {errors.basePrice && <Text>{errors.basePrice.message}</Text>}

      <TouchableOpacity
        className="bg-green-600 self-end mt-6 px-8 py-2 rounded-lg border-2 border-green-500 disabled:opacity-50"
        onPress={handleSubmit((data) => {
          return createService.mutateAsync(data);
        })}
      >
        <Text className="text-white">Submit</Text>
      </TouchableOpacity>
    </Layout>
  );
};
