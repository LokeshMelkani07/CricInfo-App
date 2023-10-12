// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMxRDorHc6NFrF0imlmtoMopqV8cLBegw",
  authDomain: "vehicleguardian.firebaseapp.com",
  projectId: "vehicleguardian",
  storageBucket: "vehicleguardian.appspot.com",
  messagingSenderId: "876414856497",
  appId: "1:876414856497:web:b9a79c06ab6e33192cd410",
  measurementId: "G-3ZE8F06EWP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
