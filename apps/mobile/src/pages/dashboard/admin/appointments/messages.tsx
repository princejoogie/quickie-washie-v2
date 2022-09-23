import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AdminAppointmentMessagesStackParamList } from "./types";
import { MessagesPage } from "../../../../components";

export const Messages = ({
  route,
  navigation,
}: NativeStackScreenProps<
  AdminAppointmentMessagesStackParamList,
  "Messages"
>) => {
  const { appointmentId } = route.params;

  return (
    <MessagesPage
      onBack={navigation.goBack}
      canGoBack={navigation.canGoBack()}
      appointmentId={appointmentId}
    />
  );
};
