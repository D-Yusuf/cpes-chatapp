// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBel3iiNoMInw7XEaDqPcGrS0OqFfxHETI",
  authDomain: "private-chatrooms.firebaseapp.com",
  projectId: "private-chatrooms",
  storageBucket: "private-chatrooms.appspot.com",
  messagingSenderId: "285713177716",
  appId: "1:285713177716:web:f299d17ff347d219dd0521",
  measurementId: "G-GTPB7YFW53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);