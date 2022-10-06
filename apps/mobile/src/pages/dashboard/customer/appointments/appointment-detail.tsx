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
import reviewService from "../../../../services/reviews";
import documentService from "../../../../services/document";
import { ChatIcon } from "../../../../components/icon/chat-icon";
import { DocumentIcon } from "../../../../components/icon/document-icon";
import { ImageIcon } from "../../../../components/icon/image-icon";
import {
  Layout,
  LoadingText,
  TextField,
  VehicleCard,
} from "../../../../components";
import { getDocument } from "../../../../utils/helpers";
import { uploadFile } from "../../../../services/firebase";
import { useAuthContext } from "../../../../contexts/auth-context";
import { StarIcon } from "../../../../components/icon/star-icon";
import type { GetAppointmentByIdResponse } from "@qw/dto";
import { queryClient } from "../../../../services/api";

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

  const totalPrice = () => {
    const price = {
      serviceFee: 0,
      additionalFee: 0,
    };

    if (a.Service) price.serviceFee = Number(a.Service.basePrice);
    if (a.AdditionalPrice)
      price.additionalFee = Number(a.AdditionalPrice.price);
    return {
      ...price,
      total: price.serviceFee + price.additionalFee,
    };
  };

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
              <View className="items-center, mr-1 justify-center rounded-full bg-blue-600 px-2 py-1">
                <Text className="h-4 text-xs text-white">
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
      <Text className="ml-2 mt-4 text-xs text-gray-400">Details</Text>
      <View className="relative mt-1 rounded-xl border-2 border-gray-700 bg-gray-800 p-3">
        <Text
          className={`font-bold ${
            a.Service ? "text-lg text-white" : "text-sm italic text-red-600"
          }`}
        >
          {a.Service?.name ?? "Unknown Service"}
        </Text>
        <Text className="text-xs text-gray-400">
          {format(date, "MMM d, yyyy")}
        </Text>
        <Text className="text-xs text-gray-400">
          {format(date, "hh:mm aa")}
        </Text>

        <View className="absolute top-1 right-1 rounded border border-green-500 bg-green-600 px-2">
          <Text className="text-xs text-white">{a.status}</Text>
        </View>

        <VehicleCard vehicle={a.Vehicle ?? undefined} />
      </View>

      <View className="mt-4 flex flex-col rounded-xl border-2 border-gray-700 bg-gray-800 p-3">
        <Text style={{ fontFamily: "Mono" }} className="text-white">
          Invoice:
        </Text>

        <View className="ml-2 mt-1 flex flex-col">
          <View className="flex w-full flex-row">
            <Text
              style={{ fontFamily: "Mono" }}
              className="text-xs text-gray-400"
            >
              Service Fee:
            </Text>
            <Text
              style={{ fontFamily: "Mono" }}
              className="flex-1 text-right text-xs text-gray-200"
            >
              ₱ {totalPrice().serviceFee.toFixed(2)}
            </Text>
          </View>

          <View className="flex w-full flex-row">
            <Text
              style={{ fontFamily: "Mono" }}
              className="text-xs text-gray-400"
            >
              Additional Fee:
            </Text>
            <Text
              style={{ fontFamily: "Mono" }}
              className="flex-1 text-right text-xs text-gray-200"
            >
              ₱ {totalPrice().additionalFee.toFixed(2)}
            </Text>
          </View>

          <View className="my-2 h-px w-full bg-gray-400" />

          <View className="flex w-full flex-row">
            <Text style={{ fontFamily: "Mono" }} className="text-xs text-white">
              Total:
            </Text>
            <Text
              style={{ fontFamily: "Mono" }}
              className="flex-1 text-right text-xs text-white"
            >
              ₱ {totalPrice().total.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-4 flex flex-row items-center justify-between">
        <Text className="ml-2 text-xs text-gray-400">Documents</Text>

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
            <Text className="mr-2 text-xs text-blue-600">
              {uploadDocuments.isLoading || isLoading
                ? "Uploading..."
                : "Update"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="relative mt-1 rounded-xl border-2 border-gray-700 bg-gray-800 p-3">
        {a.documents.length <= 0 && documents.length <= 0 && (
          <Text className="text-center text-xs text-white">No documents</Text>
        )}
        {a.documents
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
          .map((doc) => (
            <View
              key={doc.id}
              className="mt-1 flex flex-row items-center justify-between rounded border-2 border-gray-700 p-2"
            >
              <TouchableOpacity
                onPress={() => {
                  WebBrowser.openBrowserAsync(doc.downloadUrl);
                }}
                className="flex flex-1 flex-row items-center"
              >
                {doc.mimeType?.startsWith("image") ? (
                  <ImageIcon filled styleName="w-5 h-5 text-gray-400" />
                ) : (
                  <DocumentIcon filled styleName="w-5 h-5 text-gray-400" />
                )}

                <Text
                  className="mx-1 flex-1 text-left text-xs text-white"
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
            <Text className="mt-2 text-center text-xs text-white">
              New documents
            </Text>
            {documents.map((doc) => (
              <View
                key={doc.uri}
                className="mt-1 flex flex-row items-center justify-between rounded border-2 border-gray-700 p-2"
              >
                <View className="flex flex-1 flex-row items-center">
                  {doc.mimeType?.startsWith("image") ? (
                    <ImageIcon filled styleName="w-5 h-5 text-gray-400" />
                  ) : (
                    <DocumentIcon filled styleName="w-5 h-5 text-gray-400" />
                  )}

                  <Text
                    className="mx-1 flex-1 text-left text-xs text-white"
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

        {!a.Review && (
          <TouchableOpacity
            onPress={async () => {
              const res = await getDocument();
              if (res && documents.findIndex((e) => e.uri === res.uri) === -1) {
                setDocuments([...documents, res]);
              }
            }}
            className="mt-2 self-center rounded bg-gray-600 p-2"
          >
            <Text className="text-white">Choose documents</Text>
          </TouchableOpacity>
        )}
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
          className="mt-2 self-end rounded p-2"
        >
          <Text className="text-red-600">Cancel Appointment</Text>
        </TouchableOpacity>
      )}

      {a.status === "FINISHED" && (
        <ReviewComponent appointmentId={appointmentId} review={a.Review} />
      )}
    </Layout>
  );
};

interface ReviewComponentProps {
  appointmentId: string;
  review: GetAppointmentByIdResponse["Review"];
}

const ReviewComponent = ({ appointmentId, review }: ReviewComponentProps) => {
  const { data } = useAuthContext();
  const [rating, setRating] = useState(review?.rating ?? 1);
  const [content, setContent] = useState(review?.content ?? "");

  const createReview = useMutation(reviewService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["appointment", appointmentId]);
      queryClient.invalidateQueries(["appointments"]);
    },
  });

  if (!data) {
    return null;
  }

  return (
    <View className="mt-4">
      <Text className="ml-2 text-xs text-gray-400">
        {!review ? "Submit a review" : "Your review"}
      </Text>

      <View className="mt-4 flex flex-row items-center justify-evenly rounded-full bg-gray-800 px-4 py-3">
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <TouchableOpacity
              key={`rating-${idx}`}
              disabled={!!review}
              onPress={() => {
                setRating(idx + 1);
              }}
            >
              <StarIcon
                styleName="text-yellow-600 h-10 w-10"
                filled={idx < rating}
              />
            </TouchableOpacity>
          ))}
      </View>

      <TextField
        multiline
        editable={!review}
        value={content}
        onChangeText={setContent}
        placeholder="Tell us more about your experience!"
      />

      {!review && (
        <TouchableOpacity
          className="mt-6 self-end rounded-lg border-2 border-green-500 bg-green-600 px-8 py-2"
          disabled={createReview.isLoading}
          onPress={() => {
            createReview.mutate({
              params: { appointmentId },
              body: { content, rating },
            });
          }}
        >
          <Text className="text-white">
            {createReview.isLoading ? "Submitting..." : "Submit review"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
