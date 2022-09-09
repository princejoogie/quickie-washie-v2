import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "react-query";
import { RootStack } from "./pages/types";
import { Login, Dashboard } from "./pages";
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
              <RootStack.Screen name="Login" component={Login} />
            ) : (
              <RootStack.Screen name="Dashboard" component={Dashboard} />
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
