import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PRO_ID,
  storageBucket: import.meta.env.VITE_STG_BUK,
  messagingSenderId: import.meta.env.VITE_MSG_ID,
  appId: import.meta.env.VITE_API_KEY,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
