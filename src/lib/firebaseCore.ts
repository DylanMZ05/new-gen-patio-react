// src/lib/firebaseCore.ts
// Inicializa la app UNA sola vez y la expone como promesa.

let appPromise: Promise<import("firebase/app").FirebaseApp> | null = null;

const firebaseConfig = {
  apiKey: "AIzaSyDaO1oxx__oVu_lDvWf2XWqNAcg-przbVs",
  authDomain: "new-gen-patio-a95f1.firebaseapp.com",
  projectId: "new-gen-patio-a95f1",
  storageBucket: "new-gen-patio-a95f1.firebasestorage.app",
  messagingSenderId: "108075494457",
  appId: "1:108075494457:web:9867c2fa626fdfd71c31e8",
  measurementId: "G-JB4X11VZ4F",
};

export async function loadApp() {
  if (!appPromise) {
    appPromise = (async () => {
      const { initializeApp, getApps, getApp } = await import("firebase/app");
      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      // (opcional) diagnóstico rápido por consola:
      if (!app.options || !(app.options as any).projectId) {
        console.warn("[firebaseCore] projectId vacío — revisa firebaseConfig");
      }
      return app;
    })();
  }
  return appPromise;
}
