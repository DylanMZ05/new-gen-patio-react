// src/i18n.ts (Versión final para cargue y persistencia)

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector'; // ⬅️ Necesario para recordar el idioma

i18n
  .use(HttpBackend) // Permite cargar los archivos JSON
  .use(LanguageDetector) // Detecta y guarda el idioma en el navegador
  .use(initReactI18next)
  .init({
    // Idiomas a soportar
    supportedLngs: ['en', 'es'],
    
    // Namespaces que necesitamos cargar de inmediato
    ns: ['header', 'home'],
    defaultNS: 'home',

    // Configuración de Detección/Caché: 
    // Intenta detectar el idioma del navegador y luego usa la cache (localStorage)
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    // Si la clave no existe en el idioma principal, usa el fallback.
    fallbackLng: 'en',
    
    backend: {
      // 🚨 La ruta a tus archivos JSON
      loadPath: '/locales/{{lng}}/{{ns}}.json', 
    },

    interpolation: {
      escapeValue: false, 
    },
    
    react: {
      // Desactivamos Suspense para que i18next resuelva inmediatamente. 
      // Ya usamos Suspense en main.tsx para el fallback global.
      useSuspense: false, 
    },
    debug: false, 
  });

export default i18n;