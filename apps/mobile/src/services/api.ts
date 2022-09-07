import axios from "axios";
import Constants from "expo-constants";

export const API_BASE_URL = Constants.manifest?.extra?.API_BASE_URL;

console.log({ API_BASE_URL });

export const api = axios.create({
  baseURL: API_BASE_URL ?? "http://localhost:4000/api",
  headers: {
    "Content-Type": "appplication/json",
    Accept: "application/json",
  },
});
