import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { format } from "date-fns";
import * as WebBrowser from "expo-web-browser";

import {
  AdminAppointmentMessagesStack,
  AdminAppointmentMessagesStackParamList,
  AdminAppointmentsStackParamList,
} from "./types";
import { Messages } from "./messages";

import appointmentService from "../../../../services/appointment";
import authService from "../../../../services/auth";
import documentService from "../../../../services/document";
import { ChatIcon } from "../../../../components/icon/chat-icon";
import { Layout, VehicleCard } from "../../../../components";
import { getDocument } from "../../../../utils/helpers";
import { uploadFile } from "../../../../services/firebase";
import { ImageIcon } from "../../../../components/icon/image-icon";
import { DocumentIcon } from "../../../../components/icon/document-icon";

export const AdminAppointmentDetail = ({
  route,
}: NativeStackScreenProps<
  AdminAppointmentsStackParamList,
  "AppointmentDetail"
>) => {
  const props = route.params;

  return (
    <AdminAppointmentMessagesStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#111827",
        },
      }}
      initialRouteName="Details"
    >
      <AdminAppointmentMessagesStack.Screen
        name="Details"
        component={Details}
        initialParams={props}
      />
      <AdminAppointmentMessagesStack.Screen
        name="Messages"
        component={Messages}
      />
    </AdminAppointmentMessagesStack.Navigator>
  );
};

const Details = ({
  route,
  navigation,
}: NativeStackScreenProps<
  AdminAppointmentMessagesStackParamList,
  "Details"
>) => {
  const { appointmentId } = route.params;
  const appointment = useQuery(["appointment", appointmentId], (e) =>
    appointmentService.getById({ appointmentId: e.queryKey[1] })
  );

  const profile = useQuery(["profile"], authService.profile);

  const uploadDocuments = useMutation(documentService.create, {
    onSuccess: async () => {
      await appointment.refetch();
      setDocuments([]);
    },
  });

  const [documents, setDocuments] = useState<
    Array<{
      uri: string;
      name: string;
      mimeType: string | undefined;
      size: number | undefined;
    }>
  >([]);

  if (appointment.isLoading) {
    return (
      <Layout
        nav={{
          title: "Appointment Detail",
          canGoBack: navigation.canGoBack(),
          onBack: navigation.goBack,
        }}
      >
        <Text>Loading...</Text>
      </Layout>
    );
  }

  if (!appointment.data) {
    return (
      <Layout
        nav={{
          title: "Appointment Detail",
          canGoBack: navigation.canGoBack(),
          onBack: navigation.goBack,
        }}
      >
        <Text>Appointment not found</Text>
      </Layout>
    );
  }

  const a = appointment.data;
  const date = new Date(a.date);

  return (
    <Layout
      nav={{
        title: "Appointment Detail",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
        actions: (
          <TouchableOpacity
            className="flex flex-row"
            onPress={() => {
              navigation.navigate("Messages", { appointmentId: a.id });
            }}
          >
            {a._count.messages > 0 && (
              <View className="mr-1 px-2 py-1 rounded-full bg-blue-600 items-center, justify-center">
                <Text className="text-white text-xs h-4">
                  {a._count.messages}
                </Text>
              </View>
            )}
            <ChatIcon />
          </TouchableOpacity>
        ),
      }}
      onRefresh={appointment.refetch}
    >
      <Text className="text-gray-400 text-xs ml-2 mt-4">Details</Text>
      <View className="border-gray-700 bg-gray-800 mt-1 rounded-xl border-2 relative p-3">
        <Text className="text-white text-lg font-bold">{a.Service?.name}</Text>
        <Text className="text-gray-400 text-xs">
          {format(date, "MMM d, yyyy")}
        </Text>
        <Text className="text-gray-400 text-xs">
          {format(date, "hh:mm aa")}
        </Text>

        <View className="bg-green-600 border border-green-500 rounded px-2 absolute top-1 right-1">
          <Text className="text-white text-xs">{a.status}</Text>
        </View>

        <VehicleCard vehicle={a.Vehicle ?? undefined} />
      </View>

      <View className="flex flex-row items-center justify-between mt-4">
        <Text className="text-gray-400 text-xs ml-2">Documents</Text>

        {documents.length > 0 && (
          <TouchableOpacity
            disabled={uploadDocuments.isLoading}
            onPress={async () => {
              if (profile.data && documents.length > 0) {
                const promises = documents.map((doc) =>
                  uploadFile(doc.uri, profile.data.email)
                );
                const dlUrls = await Promise.all(promises);

                uploadDocuments.mutateAsync({
                  documents: documents.map((doc, idx) => ({
                    name: doc.name,
                    mimeType: doc.mimeType ?? "application/octet-stream",
                    downloadUrl: dlUrls[idx],
                  })),
                  appointmentId: a.id,
                });
              }
            }}
          >
            <Text className="text-blue-600 text-xs mr-2">
              {uploadDocuments.isLoading ? "Uploading..." : "Update"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="border-gray-700 bg-gray-800 mt-1 rounded-xl border-2 relative p-3">
        {appointment.data.documents.length > 0 ? (
          appointment.data.documents
            .sort((a, b) => {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            })
            .map((doc) => (
              <View
                key={doc.id}
                className="flex flex-row items-center justify-between border-2 border-gray-700 p-2 rounded mt-1"
              >
                <TouchableOpacity
                  onPress={() => {
                    WebBrowser.openBrowserAsync(doc.downloadUrl);
                  }}
                  className="flex flex-row items-center flex-1"
                >
                  {doc.mimeType?.startsWith("image") ? (
                    <ImageIcon filled styleName="w-5 h-5 text-gray-400" />
                  ) : (
                    <DocumentIcon filled styleName="w-5 h-5 text-gray-400" />
                  )}

                  <Text
                    className="mx-1 flex-1 text-xs text-white text-left"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {doc.name}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text className="text-xs text-red-600">Delete</Text>
                </TouchableOpacity>
              </View>
            ))
        ) : (
          <Text className="text-xs text-white text-center">No documents</Text>
        )}

        {documents.length > 0 && (
          <>
            <Text className="text-xs text-white text-center mt-3">
              New documents
            </Text>
            {documents.map((doc) => (
              <View
                key={doc.uri}
                className="flex flex-row items-center justify-between border-2 border-gray-700 p-2 rounded mt-1"
              >
                <View className="flex flex-row items-center flex-1">
                  {doc.mimeType?.startsWith("image") ? (
                    <ImageIcon filled styleName="w-5 h-5 text-gray-400" />
                  ) : (
                    <DocumentIcon filled styleName="w-5 h-5 text-gray-400" />
                  )}

                  <Text
                    className="mx-1 flex-1 text-xs text-white text-left"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {doc.name}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setDocuments((d) => d.filter((d) => d.uri !== doc.uri));
                  }}
                >
                  <Text className="text-xs text-red-600">Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        <TouchableOpacity
          onPress={async () => {
            const res = await getDocument();
            if (res && documents.findIndex((e) => e.uri === res.uri) === -1) {
              setDocuments([...documents, res]);
            }
            console.log(res);
          }}
          className="mt-2 self-center bg-gray-600 p-2 rounded"
        >
          <Text className="text-white">Choose documents</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};
