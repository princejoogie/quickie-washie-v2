import { useState } from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
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
import {
  AppointmentStatusModal,
  Layout,
  LoadingText,
  VehicleCard,
} from "../../../../components";
import { getDocument } from "../../../../utils/helpers";
import { uploadFile } from "../../../../services/firebase";
import { ImageIcon } from "../../../../components/icon/image-icon";
import { DocumentIcon } from "../../../../components/icon/document-icon";
import { ChangeDate } from "./change-date";
import { useIsFocused } from "@react-navigation/native";

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
      <AdminAppointmentMessagesStack.Screen
        name="ChangeDate"
        component={ChangeDate}
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

  const isFocused = useIsFocused();

  if (isFocused && appointment.isStale) {
    appointment.refetch();
  }

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

  const [modalVisible, setModalVisible] = useState(false);
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

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        className="border-gray-700 bg-gray-800 mt-1 rounded-lg border-2 relative py-2 px-3"
      >
        <Text className="text-center text-gray-400 font-normal">
          Change Status
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ChangeDate", {
            appointmentId: a.id,
            date: `${a.date}`,
          });
        }}
        className="border-gray-700 bg-gray-800 mt-1 rounded-lg border-2 relative py-2 px-3"
      >
        <Text className="text-center text-gray-400 font-normal">
          Change Date
        </Text>
      </TouchableOpacity>

      <Text className="text-gray-400 text-xs ml-2 mt-4">Customer</Text>
      <View className="border-gray-700 bg-gray-800 mt-1 rounded-xl border-2 relative p-3">
        {a.User ? (
          <>
            <View className="flex flex-row items-center">
              <Image
                className="h-12 w-12 rounded-full bg-gray-700 mr-2"
                source={{ uri: a.User.photoUrl }}
              />

              <View>
                <Text className="text-white font-bold">{a.User.name}</Text>
                <Text className="text-gray-300 text-xs" selectable>
                  {a.User.email}
                </Text>
              </View>
            </View>

            <Text className="text-gray-400 text-xs mt-3">Phone number</Text>
            <TouchableOpacity
              className="px-3 py-2 rounded-md mt-2 border-2 border-gray-700"
              onPress={() => {
                if (a.User?.phone) {
                  Linking.openURL(`tel:${a.User.phone}`);
                }
              }}
            >
              <Text className="text-gray-300 text-xs">{a.User.phone}</Text>
            </TouchableOpacity>

            <Text className="text-gray-400 text-xs mt-3">Drivers license</Text>
            <TouchableOpacity
              className="mt-2"
              onPress={() => {
                if (a.User?.licenseUrl) {
                  WebBrowser.openBrowserAsync(a.User.licenseUrl);
                }
              }}
            >
              <Image
                className="h-32 w-full bg-gray-900 rounded-md border-2 border-gray-700"
                source={{ uri: a.User.licenseUrl }}
              />
            </TouchableOpacity>
          </>
        ) : (
          <Text className="text-red-600 italic">Customer not found</Text>
        )}
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
              className="flex flex-row items-center justify-between border-2 border-gray-700 p-2 rounded-md mt-1"
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
                className="flex flex-row items-center justify-between border-2 border-gray-700 p-2 rounded-md mt-1"
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
          className="mt-2 self-center bg-gray-600 p-2 rounded-md"
        >
          <Text className="text-white">Choose documents</Text>
        </TouchableOpacity>
      </View>

      {modalVisible && (
        <AppointmentStatusModal
          key={a.status}
          visible={true}
          initialValue={a.status}
          onDismiss={(status) => {
            updateAppointment.mutate({
              body: { status },
              params: { appointmentId: a.id },
            });
            setModalVisible(false);
          }}
          closeModal={() => {
            setModalVisible(false);
          }}
        />
      )}
    </Layout>
  );
};
