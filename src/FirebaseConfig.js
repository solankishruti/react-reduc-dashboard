// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbvamDSAZcnIVIZl-0wYcLhk0Y6Z5z32Y",
  authDomain: "react-demo-a3e9a.firebaseapp.com",
  projectId: "react-demo-a3e9a",
  storageBucket: "react-demo-a3e9a.appspot.com",
  messagingSenderId: "391277832041",
  appId: "1:391277832041:web:58d0f0efaabf806e303ff8",
  measurementId: "G-BVWW9FCW2F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const analytics = getAnalytics(app);
