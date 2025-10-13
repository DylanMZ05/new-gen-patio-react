// src/lib/firebaseAuth.ts
import { loadApp } from "./firebaseCore";

let authPromise: Promise<import("firebase/auth").Auth> | null = null;

export function loadAuth() {
  if (!authPromise) {
    authPromise = (async () => {
      const app = await loadApp();
      const { getAuth } = await import("firebase/auth");
      return getAuth(app);
    })();
  }
  return authPromise;
}
