// src/lib/firebaseAnalytics.ts
import { loadApp } from "./firebaseCore";
let analyticsOnce: Promise<import("firebase/analytics").Analytics | null> | null = null;

export function loadAnalytics() {
  if (!analyticsOnce) {
    analyticsOnce = (async () => {
      const app = await loadApp();
      const { getAnalytics, isSupported } = await import("firebase/analytics");
      return (await isSupported()) ? getAnalytics(app) : null;
    })();
  }
  return analyticsOnce;
}
