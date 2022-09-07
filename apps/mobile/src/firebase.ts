import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

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

if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const storage = getStorage(app);
