import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useIsFocused } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  CustomerAppointmentsStack,
  CustomerAppointmentsStackParamList,
} from "./types";

import { CustomerDashboardParamList } from "../types";

import appointmentService from "../../../../services/appointment";
import {
  AppointmentCard,
  AppointmentFilterModal,
  Layout,
  LoadingText,
} from "../../../../components";
import { AppointmentDetail } from "./appointment-detail";
import { FilterType } from "../../../../constants";
import { FilterIcon } from "../../../../components/icon/filter-icon";
import { ChevronIcon } from "../../../../components/icon/chevron-icon";

export const Appointments = ({}: BottomTabScreenProps<
  CustomerDashboardParamList,
  "Appointments"
>) => {
  return (
    <CustomerAppointmentsStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#111827",
        },
      }}
      initialRouteName="AllAppointments"
    >
      <CustomerAppointmentsStack.Screen
        name="AllAppointments"
        component={AllAppointments}
      />
      <CustomerAppointmentsStack.Screen
        name="AppointmentDetail"
        component={AppointmentDetail}
      />
    </CustomerAppointmentsStack.Navigator>
  );
};

const AllAppointments = ({
  navigation,
}: NativeStackScreenProps<
  CustomerAppointmentsStackParamList,
  "AllAppointments"
>) => {
  const [view, setView] = useState<"ALL" | "TO_REVIEW">("ALL");
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [modalVisible, setModalVisible] = useState(false);
  const appointments = useQuery(["appointments"], appointmentService.getAll);
  const isFocused = useIsFocused();

  if (isFocused && appointments.isStale) {
    appointments.refetch();
  }

  const filteredAppointments =
    filter === "ALL"
      ? appointments.data
      : appointments.data?.filter((a) => a.status === filter);

  const toReviewAppointments = appointments.data?.filter((a) => {
    const isFinished = a.status === "FINISHED";
    const isReviewed = a.reviews.length > 0 && a.reviews[0];
    return isFinished && !isReviewed;
  });

  return (
    <Layout
      nav={{
        title: "Appointments",
        actions: (
          <TouchableOpacity
            className="flex flex-row items-center"
            onPress={() => setModalVisible(true)}
          >
            <FilterIcon />
          </TouchableOpacity>
        ),
      }}
      onRefresh={appointments.refetch}
    >
      {view === "TO_REVIEW" ? (
        <View>
          <TouchableOpacity
            className="mt-4 flex flex-row items-center"
            onPress={() => {
              setView("ALL");
            }}
          >
            <ChevronIcon direction="left" styleName="text-blue-600 h-4 w-4" />
            <Text className="ml-1 text-blue-600">Back</Text>
          </TouchableOpacity>

          {toReviewAppointments?.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              onClick={() => {
                navigation.navigate("AppointmentDetail", {
                  appointmentId: apt.id,
                });
              }}
            />
          ))}
        </View>
      ) : (
        <>
          {toReviewAppointments && toReviewAppointments.length > 0 ? (
            <TouchableOpacity
              className="mt-4"
              onPress={() => {
                setView("TO_REVIEW");
              }}
            >
              <Text className="text-blue-600">
                To review ({toReviewAppointments.length})
              </Text>
            </TouchableOpacity>
          ) : null}

          {appointments.isLoading ? (
            <LoadingText />
          ) : filteredAppointments && filteredAppointments.length > 0 ? (
            filteredAppointments?.map((apt) => (
              <AppointmentCard
                key={apt.id}
                appointment={apt}
                onClick={() => {
                  navigation.navigate("AppointmentDetail", {
                    appointmentId: apt.id,
                  });
                }}
              />
            ))
          ) : (
            <Text className="mt-4 text-center text-xs text-gray-400">
              No appointments available.
            </Text>
          )}

          {modalVisible && (
            <AppointmentFilterModal
              key={filter}
              visible={true}
              initialValue={filter}
              onDismiss={(e) => {
                setFilter(e);
                setModalVisible(false);
              }}
              closeModal={() => {
                setModalVisible(false);
              }}
            />
          )}
        </>
      )}
    </Layout>
  );
};
