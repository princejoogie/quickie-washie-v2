import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { Layout } from "../../../../components";
import { HomeStackParamList } from "./types";

export const BookService = ({
  route,
  navigation,
}: NativeStackScreenProps<HomeStackParamList, "BookService">) => {
  const props = route.params;

  return (
    <Layout
      nav={{
        title: "Book Service",
        canGoBack: navigation.canGoBack(),
        onBack: navigation.goBack,
      }}
    >
      <Text className="text-white">Book Service {props.serviceId}</Text>
    </Layout>
  );
};
