import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { View, Alert, Image, Text, TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { ImageInput, Layout, TextField } from "../../../../components";
import { useAuthContext } from "../../../../contexts/auth-context";
import authService from "../../../../services/auth";

import { CustomerDashboardParamList } from "../types";
import { PencilSquareIcon } from "../../../../components/icon/pencil-square-icon";
import { getImage } from "../../../../utils/helpers";

const updateSchema = z.object({
  name: z.string().min(1, { message: "Invalid name" }).max(255).trim(),
  imageUrl: z.string().url(),
  licenseUrl: z.string().url(),
});

type UpdateSchema = z.infer<typeof updateSchema>;

export const Profile = ({}: BottomTabScreenProps<
  CustomerDashboardParamList,
  "Profile"
>) => {
  const { logout } = useAuthContext();
  const { control, handleSubmit, setValue, reset } = useForm<UpdateSchema>({
    mode: "all",
    resolver: zodResolver(updateSchema),
  });

  const profile = useQuery(["profile"], authService.profile, {
    onSuccess: (data) => {
      setValue("name", data.name);
      setValue("imageUrl", data.photoUrl);
      setValue("licenseUrl", data.licenseUrl);
    },
  });

  const updateProfile = useMutation(authService.updateProfile, {
    onSuccess: () => {
      profile.refetch();
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const isFocused = useIsFocused();

  if (isFocused && profile.isStale) {
    profile.refetch();
  }

  return (
    <Layout
      className="p-6"
      nav={{
        title: "Profile",
        actions: (
          <TouchableOpacity onPress={logout}>
            <Text className="text-red-600">Logout</Text>
          </TouchableOpacity>
        ),
      }}
      onRefresh={profile.refetch}
    >
      <Controller
        control={control}
        name="imageUrl"
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity
            disabled={!isEditing}
            className="mx-auto h-32 w-32 rounded-full bg-gray-800 border-2 border-gray-700"
            onPress={async () => {
              const res = await getImage({ aspect: [1, 1] });
              if (res) onChange(res.uri);
            }}
          >
            {!value ? (
              <PencilSquareIcon styleName="text-blue-600" />
            ) : (
              <Image
                className="h-full w-full rounded-full"
                source={{ uri: value }}
              />
            )}
          </TouchableOpacity>
        )}
      />

      <TextField
        editable={false}
        keyboardType="email-address"
        label="Email"
        value={profile.data?.email}
      />

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value, ...rest } }) => (
          <TextField
            {...rest}
            editable={isEditing}
            label="Full name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="licenseUrl"
        render={({ field: { onChange, value } }) => (
          <ImageInput
            editable={isEditing}
            label="Drivers license"
            uri={value}
            callback={(e) => {
              if (e) onChange(e.uri);
            }}
          />
        )}
      />

      <View className="flex flex-row items-center justify-between mt-6">
        <TouchableOpacity
          className="bg-green-600 px-8 py-2 rounded-lg border-2 border-green-500 disabled:opacity-50"
          onPress={() => {
            if (isEditing) {
              Alert.prompt("Verify password", "", async (currentPassword) => {
                console.log({ currentPassword });
              });
              setIsEditing(false);
            } else {
              setIsEditing(true);
            }
          }}
        >
          <Text className="text-white">{isEditing ? "Save" : "Edit"}</Text>
        </TouchableOpacity>

        {isEditing && (
          <TouchableOpacity
            onPress={() => {
              setIsEditing(false);
              reset();
            }}
          >
            <Text className="text-red-600">Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        className="mt-4"
        onPress={() => {
          Alert.prompt("Current password", "", async (currentPassword) => {
            Alert.prompt("New password", "", async (newPassword) => {
              console.log({ currentPassword, newPassword });
            });
          });
        }}
      >
        <Text className="text-blue-600">Change Password</Text>
      </TouchableOpacity>
    </Layout>
  );
};
