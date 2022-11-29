import { registerRootComponent } from "expo";
import { LogBox } from "react-native";
import App from "./src/app";

LogBox.ignoreLogs(["AxiosError"]);

registerRootComponent(App);
