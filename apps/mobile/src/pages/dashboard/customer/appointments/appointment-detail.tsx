import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { format } from "date-fns";
import * as WebBrowser from "expo-web-browser";

import {
  CustomerAppointmentsStackParamList,
  AppointmentMessagesStack,
  AppointmentMessagesStackParamList,
} from "./types";
import { Messages } from "./messages";

import appointmentService from "../../../../services/appointment";
import authService from "../../../../services/auth";
import documentService from "../../../../services/document";
import { ChatIcon } from "../../../../components/icon/chat-icon";
import { DocumentIcon } from "../../../../components/icon/document-icon";
import { ImageIcon } from "../../../../components/icon/image-icon";
import { Layout, LoadingText, VehicleCard } from "../../../../components";
import { getDocument } from "../../../../utils/helpers";
import { uploadFile } from "../../../../services/firebase";

export const AppointmentDetail = ({
  route,
}: NativeStackScreenProps<
  CustomerAppointmentsStackParamList,
  "AppointmentDetail"
>) => {
  return (
    <AppointmentMessagesStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#111827",
        },
      }}
      initialRouteName="Details"
    >
      <AppointmentMessagesStack.Screen
        name="Details"
        component={Details}
        initialParams={route.params}
      />
      <AppointmentMessagesStack.Screen name="Messages" component={Messages} />
    </AppointmentMessagesStack.Navigator>
  );
};

const Details = ({
  route,
  navigation,
}: NativeStackScreenProps<AppointmentMessagesStackParamList, "Details">) => {
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

  const updateAppointment = useMutation(appointmentService.update, {
    onSuccess: async () => {
      await appointment.refetch();
    },
  });

  const deleteDocument = useMutation(documentService.deleteDocument, {
    onSuccess: async () => {
      await appointment.refetch();
    },
  });

  const [isLoading, setIsLoading] = useState(false);
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
        <LoadingText />
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
        <LoadingText text="Appointment not found" />
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
        <Text
          className={`font-bold ${
            a.Service ? "text-lg text-white" : "text-sm text-red-600 italic"
          }`}
        >
          {a.Service?.name ?? "Unknown Service"}
        </Text>
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
            disabled={uploadDocuments.isLoading || isLoading}
            onPress={async () => {
              if (profile.data && documents.length > 0) {
                setIsLoading(true);
                const promises = documents.map((doc) =>
                  uploadFile(doc.uri, profile.data.email)
                );
                const dlUrls = await Promise.all(promises);

                await uploadDocuments.mutateAsync({
                  documents: documents.map((doc, idx) => ({
                    name: doc.name,
                    mimeType: doc.mimeType ?? "application/octet-stream",
                    downloadUrl: dlUrls[idx],
                  })),
                  appointmentId: a.id,
                  userId: profile.data.id,
                });
                setIsLoading(false);
              }
            }}
          >
            <Text className="text-blue-600 text-xs mr-2">
              {uploadDocuments.isLoading || isLoading
                ? "Uploading..."
                : "Update"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="border-gray-700 bg-gray-800 mt-1 rounded-xl border-2 relative p-3">
        {appointment.data.documents.length <= 0 && documents.length <= 0 && (
          <Text className="text-xs text-white text-center">No documents</Text>
        )}
        {appointment.data.documents
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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

              {doc.userId === profile.data?.id && (
                <TouchableOpacity
                  disabled={deleteDocument.isLoading}
                  onPress={() => {
                    deleteDocument.mutate({ documentId: doc.id });
                  }}
                  className={
                    deleteDocument.isLoading ? "opacity-50" : "opacity-100"
                  }
                >
                  <Text className="text-xs text-red-600">Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

        {documents.length > 0 && (
          <>
            <Text className="text-xs text-white text-center mt-2">
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

      {a.status === "PENDING" && (
        <TouchableOpacity
          onPress={async () => {
            Alert.alert(
              "Cancel Appointment",
              "Are you sure you want to cancel this appointment?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: async () => {
                    await updateAppointment.mutateAsync({
                      body: { status: "CANCELLED" },
                      params: { appointmentId: a.id },
                    });
                  },
                },
              ]
            );
          }}
          className="mt-2 self-end p-2 rounded"
        >
          <Text className="text-red-600">Cancel Appointment</Text>
        </TouchableOpacity>
      )}
    </Layout>
  );
};
