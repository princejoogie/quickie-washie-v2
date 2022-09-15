import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";

import { RootStack } from "./pages/types";
import { Login, Register } from "./pages";
import { UserDashboard } from "./pages/dashboard/customer";
import { AdminDashboard } from "./pages/dashboard/admin";
import { AuthProvider, useAuthContext } from "./contexts/auth-context";
import { queryClient } from "./services/api";

const App = () => {
  const { data, isLoading } = useAuthContext();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
                name="UserDashboard"
                component={UserDashboard}
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
