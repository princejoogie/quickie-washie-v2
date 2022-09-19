import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { CustomerAppointmentsStackParamList } from "./types";
import { Layout, TextField } from "../../../../components";

export const AppointmentDetail = ({
  route,
  navigation,
}: NativeStackScreenProps<
  CustomerAppointmentsStackParamList,
  "AppointmentDetail"
>) => {
  const props = route.params;

  return (
    <Layout
      nav={{
        title: "Appointment Detail",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
      }}
    >
      <TextField className="text-white" value={props.Service?.name} />
    </Layout>
  );
};
