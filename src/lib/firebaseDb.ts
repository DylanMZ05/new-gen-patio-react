// src/lib/firebaseDb.ts
// Carga Firestore on-demand. Intenta caché persistente y,
// si el navegador la bloquea, cae a Firestore sin persistencia.

import { loadApp } from "./firebaseCore";

let dbPromise: Promise<import("firebase/firestore").Firestore> | null = null;

export async function loadFirestore() {
  if (!dbPromise) {
    dbPromise = (async () => {
      const app = await loadApp();
      const {
        getFirestore,
        initializeFirestore,
        persistentLocalCache,
        persistentMultipleTabManager,
      } = await import("firebase/firestore");

      try {
        // Caché persistente (IndexedDB) + multi-tab
        return initializeFirestore(app, {
          localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager(),
          }),
        });
      } catch (err) {
        console.warn(
          "[firebaseDb] IndexedDB no disponible; usando Firestore sin persistencia:",
          err
        );
        // Fallback sin persistencia
        return getFirestore(app);
      }
    })();
  }
  return dbPromise;
}
