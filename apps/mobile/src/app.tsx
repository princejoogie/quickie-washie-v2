import * as Linking from "expo-linking";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";

import { RootStack } from "./pages/types";
import { Login, Register } from "./pages";
import { CustomerDashboard } from "./pages/dashboard/customer";
import { AdminDashboard } from "./pages/dashboard/admin";
import { AuthProvider, useAuthContext } from "./contexts/auth-context";
import { queryClient } from "./services/api";

const prefix = Linking.createURL("/");

const App = () => {
  const { data, isLoading } = useAuthContext();

  return (
    <SafeAreaProvider>
      <NavigationContainer
        linking={{
          prefixes: [prefix],
          config: {
            screens: {
              CustomerDashboard: {
                // @ts-expect-error
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
          },
        }}
      >
        <StatusBar style="light" />

        {isLoading ? (
          <View className="bg-gray-900 flex flex-1 items-center justify-center">
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

const AuthWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AuthWrapper;
