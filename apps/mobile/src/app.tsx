import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "react-query";
import { RootStack } from "./pages/types";
import { Login, Dashboard } from "./pages";
import { AuthProvider } from "./contexts/auth-context";
import { queryClient } from "./services/api";

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />

        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#111827",
            },
          }}
          initialRouteName="Login"
        >
          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="Dashboard" component={Dashboard} />
        </RootStack.Navigator>
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
