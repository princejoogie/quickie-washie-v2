import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Layout } from "../../../components";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../../constants";
import { DashboardParamList } from "../types";

export const Home = ({}: BottomTabScreenProps<DashboardParamList, "Home">) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  return (
    <Layout nav={{ title: "Home" }}>
      <TouchableOpacity
        onPress={async () => {
          const atoken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
          const rtoken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
          setAccessToken(atoken ?? "");
          setRefreshToken(rtoken ?? "");
        }}
      >
        <Text className="text-white">Get keys</Text>
      </TouchableOpacity>

      <Text className="mt-4 text-white">{accessToken}</Text>
      <Text className="mt-4 text-white">{refreshToken}</Text>
    </Layout>
  );
};
