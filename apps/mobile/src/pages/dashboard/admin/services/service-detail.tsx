import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ServicesStackParamList } from "./types";

import { Layout, TextField } from "../../../../components";

export const ServiceDetail = ({
  route,
  navigation,
}: NativeStackScreenProps<ServicesStackParamList, "ServiceDetail">) => {
  const props = route.params;

  return (
    <Layout
      nav={{
        title: "Service Detail",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
      }}
    >
      <TextField placeholder="Oil Change" label="Name" value={props.name} />
      <TextField
        placeholder="Oil change"
        label="Description"
        value={props.description}
      />
      <TextField
        placeholder="100.00"
        label="Base price"
        value={props.basePrice.toString()}
      />
    </Layout>
  );
};
