// src/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Carga los archivos JSON por HTTP
  .use(LanguageDetector) // Detecta y guarda el idioma en el navegador (localStorage)
  .use(initReactI18next)
  .init({
    // Idioma a usar en la primera carga si no se detecta o no hay preferencia previa guardada.
    // Esto es CLAVE para establecer el idioma por defecto como inglés.
    lng: 'en', 

    // Idiomas a soportar
    supportedLngs: ['en', 'es'],
    
    // Namespaces a precargar o a los que se puede acceder globalmente
    // 🚨 LISTA COMPLETA DE NAMESPACES:
    ns: ['header', 'home', 'common', 'services', 'our-promise', 'about-us', 'blog', 'faq'],
    defaultNS: 'home',

    // Configuración para recordar el idioma
    // NOTA: 'querystring' es una buena opción para forzar el idioma (ej: ?lng=es)
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    // Idioma de reserva si el idioma actual no tiene una clave de traducción.
    // Debe ser 'en' para asegurar que siempre haya una traducción válida.
    fallbackLng: 'en',
    
    backend: {
      // 🚨 RUTA CRÍTICA: Debe apuntar a la carpeta public/locales/
      loadPath: '/locales/{{lng}}/{{ns}}.json', 
    },

    interpolation: {
      escapeValue: false, 
    },
    
    react: {
      useSuspense: false, 
    },
    debug: false, 
  });

export default i18n;