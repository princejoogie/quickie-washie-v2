import { NavigationContainer } from "@react-navigation/native";
import {
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Layout } from "./components";
import { EmailSentSvg } from "./components/icon/email-sent-icon";
import { AuthProvider, useAuthContext } from "./contexts/auth-context";
import { useNotifications } from "./lib/background-tasks/use-notifications";
import { Login, Register } from "./pages";
import { AdminDashboard } from "./pages/dashboard/admin";
import { CustomerDashboard } from "./pages/dashboard/customer";
import { RootStack } from "./pages/types";
import { queryClient } from "./services/api";
import authService from "./services/auth";

const prefix = Linking.createURL("/");

const config: any = {
  screens: {
    CustomerDashboard: {
      screens: {
        Appointments: {
          screens: {
            AppointmentDetail: {
              screens: {
                Details: {
                  path: "customer-dashboard/appointments/:appointmentId",
                  parse: {
                    appointmentId: (id: string) => `${id}`,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const App = () => {
  const { data, isLoading } = useAuthContext();
  const [fontsLoaded] = useFonts({
    Mono: require("./assets/RobotoMono-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer
        linking={{
          prefixes: [prefix],
          config,
        }}
      >
        <StatusBar style="light" />

        {isLoading ? (
          <View className="flex flex-1 items-center justify-center bg-gray-900">
            <Text className="text-white">Loading...</Text>
          </View>
        ) : (
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "#111827",
              },
            }}
            initialRouteName="Login"
          >
            {!data ? (
              <>
                <RootStack.Screen name="Login" component={Login} />
                <RootStack.Screen name="Register" component={Register} />
              </>
            ) : !data.isVerified ? (
              <RootStack.Screen name="Unverified" component={Unverified} />
            ) : data.privilege === "ADMIN" ? (
              <RootStack.Screen
                name="AdminDashboard"
                component={AdminDashboard}
              />
            ) : (
              <RootStack.Screen
                name="CustomerDashboard"
                component={CustomerDashboard}
              />
            )}
          </RootStack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const Unverified = () => {
  const { logout, refresh, data } = useAuthContext();

  const profile = useQuery(["profile"], authService.profile);
  const sendVerification = useMutation(authService.sendVerificationEmail);

  useEffect(() => {
    const interval = setInterval(() => {
      refresh();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Layout>
      <View className="flex-1 items-center justify-between">
        <Text className="mt-4 text-lg text-gray-400">Account Unverified</Text>

        <EmailSentSvg styleName="mx-auto my-8" />

        <Text className="text-2xl font-bold text-white">Check your email</Text>
        <Text className="text-xs text-gray-400">
          Make sure to check your{" "}
          <Text className="font-bold text-white">spam </Text>
          folder.
        </Text>

        {profile.data && (
          <View className="my-4">
            <Text className="text-center text-gray-300">
              We sent a verification link to
            </Text>
            <Text className="text-center font-bold text-gray-300">
              {profile.data.email}
            </Text>
          </View>
        )}

        <View className="mt-32" />

        <Text className="text-xs text-gray-400">
          Want to use a different account?
        </Text>
        <TouchableOpacity>
          <Text className="text-blue-600" onPress={logout}>
            Return to login
          </Text>
        </TouchableOpacity>

        <Text className="mt-4 text-xs text-gray-400">
          Didn&apos;t receive the email?
        </Text>
        <TouchableOpacity disabled={sendVerification.isLoading}>
          <Text
            className={`text-blue-600 ${
              sendVerification.isLoading ? "opacity-50" : "opacity-100"
            }`}
            onPress={() => {
              if (data?.id) sendVerification.mutate({ uid: data.id });
            }}
          >
            {sendVerification.isLoading
              ? "Sending..."
              : "Resend verification link"}
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const AuthWrapper = () => {
  useNotifications();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AuthWrapper;
