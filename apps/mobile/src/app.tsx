import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider, QueryClient } from "react-query";
import { RootStack } from "./pages/types";
import { Login, Home } from "./pages";
import { AuthProvider } from "./contexts/auth-context";

export const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />

        <RootStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="Home" component={Home} />
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
