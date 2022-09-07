import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  signOut,
  initializeAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgInv_BS36lDGwd1hsWFuyOBTbOF4paLQ",
  authDomain: "quickie-washie-v2-dev.firebaseapp.com",
  projectId: "quickie-washie-v2-dev",
  storageBucket: "quickie-washie-v2-dev.appspot.com",
  messagingSenderId: "397342408130",
  appId: "1:397342408130:web:e9570218fdc4c32320aa5b",
  measurementId: "G-X9VZRKGHEH",
};

export let app: FirebaseApp;
export let auth: Auth;

if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth(app);
}

export const storage = getStorage(app);

export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
  return await signOut(auth);
};
