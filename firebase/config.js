import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyB0z3voweFPvY757XI-P1bJ16JnwRYyBbE",
  authDomain: "react-native-70fc9.firebaseapp.com",
  projectId: "react-native-70fc9",
  storageBucket: "react-native-70fc9.appspot.com",
  messagingSenderId: "174177857628",
  appId: "1:174177857628:web:240ffe5e0f878827997699",
  measurementId: "G-JB9BNJEXNH",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
