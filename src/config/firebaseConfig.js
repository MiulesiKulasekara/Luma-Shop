// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCslx4WfbwqMW243AD7fiOWWVcq9dTI5Ro",
  authDomain: "lumashop-3ee99.firebaseapp.com",
  projectId: "lumashop-3ee99",
  storageBucket: "lumashop-3ee99.appspot.com",
  messagingSenderId: "106799686931",
  appId: "1:106799686931:web:ed614509c9d86ae8d9e6e6",
  measurementId: "G-F7XLBE8D3V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);