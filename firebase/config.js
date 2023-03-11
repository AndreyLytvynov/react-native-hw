// import firebase from "firebase";
// import "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0z3voweFPvY757XI-P1bJ16JnwRYyBbE",
  authDomain: "react-native-70fc9.firebaseapp.com",
  projectId: "react-native-70fc9",
  storageBucket: "react-native-70fc9.appspot.com",
  messagingSenderId: "174177857628",
  appId: "1:174177857628:web:240ffe5e0f878827997699",
  measurementId: "G-JB9BNJEXNH",
};

export default firebase.initializeApp(firebaseConfig);
