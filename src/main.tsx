import { StrictMode, Suspense } from "react"; // ⬅️ Importamos Suspense
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next"; // ⬅️ Importamos el proveedor de i18n
import "./index.css";
import App from "./App.tsx";
import i18n from "./i18n"; // ⬅️ Importamos tu archivo de configuración de i18n (src/i18n.ts)

// Componente simple que se muestra mientras cargan los archivos JSON de traducción por HTTP
const LoadingFallback = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h3>Cargando traducciones...</h3>
    <p>La aplicación estará lista en un momento.</p>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 1. I18nextProvider: Pasa la instancia de i18n a toda la app.
      2. Suspense: Muestra el 'fallback' (LoadingFallback) mientras los archivos
         JSON de traducción (header.json, home.json) se cargan de forma asíncrona.
    */}
    <Suspense fallback={<LoadingFallback />}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Suspense>
  </StrictMode>,
);