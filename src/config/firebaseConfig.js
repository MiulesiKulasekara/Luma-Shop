// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "FILL_CORRECT_DETAILS",
  authDomain: "FILL_CORRECT_DETAILS",
  projectId: "FILL_CORRECT_DETAILS",
  storageBucket: "FILL_CORRECT_DETAILS",
  messagingSenderId: "FILL_CORRECT_DETAILS",
  appId: "FILL_CORRECT_DETAILS",
  measurementId: "FILL_CORRECT_DETAILS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };