// src/pages/Admin/Login.tsx  (ajusta la ruta si tu archivo está en otro lugar)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadAuth } from "../../lib/firebaseAuth";
import type { FirebaseError } from "firebase/app"; // type-only: no aumenta el bundle

function getFirebaseErrorMessage(e: unknown): string {
  const code = (e as FirebaseError)?.code;
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Invalid email or password.";
    case "auth/user-not-found":
      return "No account exists with that email.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Check your connection.";
    default:
      return "Sign-in failed. Please try again.";
  }
}

const Login: React.FC = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [pending, setPending]   = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      // Carga el SDK justo cuando lo necesitás (no en top-level)
      const auth = await loadAuth();
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard");
    } catch (e) {
      setError(getFirebaseErrorMessage(e));
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          inputMode="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          disabled={pending}
        >
          {pending ? "Signing in…" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
