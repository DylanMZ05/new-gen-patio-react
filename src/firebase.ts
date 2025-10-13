// // src/firebase.ts
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import {
//   initializeFirestore,
//   persistentLocalCache,
//   persistentMultipleTabManager,
// } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";

// // ✅ Configuración de Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyDaO1oxx__oVu_lDvWf2XWqNAcg-przbVs",
//   authDomain: "new-gen-patio-a95f1.firebaseapp.com",
//   projectId: "new-gen-patio-a95f1",
//   storageBucket: "new-gen-patio-a95f1.firebasestorage.app",
//   messagingSenderId: "108075494457",
//   appId: "1:108075494457:web:9867c2fa626fdfd71c31e8",
//   measurementId: "G-JB4X11VZ4F",
// };

// // ✅ Inicializa la app una sola vez
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// // ✅ Firestore con caché persistente
// export const db = initializeFirestore(app, {
//   localCache: persistentLocalCache({
//     tabManager: persistentMultipleTabManager(), // Soporte multi-tab
//   }),
// });

// // ✅ Otros servicios
// export const auth = getAuth(app);
// export const storage = getStorage(app);
// export const analytics = getAnalytics(app);
