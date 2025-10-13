// src/lib/firebaseStorage.ts
import { loadApp } from "./firebaseCore";

let storagePromise: Promise<import("firebase/storage").FirebaseStorage> | null = null;

export async function loadStorage() {
  if (!storagePromise) {
    storagePromise = (async () => {
      const app = await loadApp();
      const { getStorage } = await import("firebase/storage");
      return getStorage(app);
    })();
  }
  return storagePromise;
}
