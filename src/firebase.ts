// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDaO1oxx__oVu_lDvWf2XWqNAcg-przbVs",
  authDomain: "new-gen-patio-a95f1.firebaseapp.com",
  projectId: "new-gen-patio-a95f1",
  storageBucket: "new-gen-patio-a95f1.appspot.com",
  messagingSenderId: "108075494457",
  appId: "1:108075494457:web:9867c2fa626fdfd71c31e8",
  measurementId: "G-JB4X11VZ4F"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
