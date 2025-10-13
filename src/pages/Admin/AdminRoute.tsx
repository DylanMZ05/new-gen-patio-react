// src/pages/Admin/AdminRoute.tsx  (si lo dejas en /pages/Admin)
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { loadAuth } from "../../lib/firebaseAuth";

interface Props { children: React.ReactNode; }

const AdminRoute: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<"checking" | "ok" | "no">("checking");

  useEffect(() => {
    let unsub: (() => void) | undefined;
    let mounted = true;

    (async () => {
      const auth = await loadAuth();                         // carga on-demand
      const { onAuthStateChanged } = await import("firebase/auth");
      unsub = onAuthStateChanged(auth, (user) => {
        if (!mounted) return;
        setState(user ? "ok" : "no");
      });
    })();

    return () => { mounted = false; unsub?.(); };
  }, []);

  if (state === "checking") return <div className="text-center py-10">Loading...</div>;
  return state === "ok" ? <>{children}</> : <Navigate to="/login/dashboard" replace />;
};

export default AdminRoute;
