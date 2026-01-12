// src/pages/YourPath/FAQEs.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FAQItem from "./FAQItemEs";
import FreeQuoteButtonEs from "../../../components/FreeQuoteButtonEs";
import useScrollToTop from "../../../../hooks/scrollToTop";
// ❌ ELIMINADO: import { useTranslation } from "react-i18next"; // ⬅️ Nuevo: Importamos useTranslation

/* ========================= Prefetch helpers (Sin cambios) ========================= */
const canPrefetch = () => {
  if (typeof navigator !== "undefined") {
    const conn = (navigator as any).connection;
    if (conn?.saveData) return false;
    const t = String(conn?.effectiveType || "").toLowerCase();
    if (t.includes("2g") || t.includes("slow-2g")) return false;
  }
  if (typeof document !== "undefined" && document.visibilityState === "hidden") return false;
  return true;
};

const runIdle = (cb: () => void) => {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout: 1200 });
  else setTimeout(cb, 250);
};

// Encuentra el chunk de /how-we-doit sin depender de la carpeta exacta (soporta '&')
let processPrefetched = false;
const processModules = import.meta.glob([
  "../../**/OurProcess*.tsx",
  "../../**/OurProcess*.jsx",
]);
const prefetchProcess = () => {
  if (processPrefetched || !canPrefetch()) return;
  const paths = Object.keys(processModules);
  if (!paths.length) return;
  processPrefetched = true;
  (processModules[paths[0]] as () => Promise<unknown>)().catch(() => {
    processPrefetched = false;
  });
};
/* =================================================================== */

const FAQEs: React.FC = () => {
  // ❌ ELIMINADO: const { t } = useTranslation(['faq', 'common']);

  const scrollToTop = useScrollToTop();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  
  // === TEXTOS Y DATOS TRADUCIDOS A PLANO ===
  const HEADER_SMALL_TITLE = "PREGUNTAS FRECUENTES";
  const HEADER_LARGE_TITLE = "Preguntas Frecuentes";
  const JSON_LD_NAME = "New Gen Patio - Preguntas Frecuentes";
  const CONTACT_PREFIX = "¿Tienes otra pregunta?";
  const CONTACT_TEXT_1 = "No hay problema, ";
  const CONTACT_LINK = "contáctanos";
  const CONTACT_SUFFIX = ".";
  const QUOTE_QUESTION_TEXT = "¿Tienes un proyecto en mente?";
  const QUOTE_BUTTON_TEXT = "¡Hablemos!";

  const faqRawData = [
    {
      question: "¿Cuánto cuesta construir un patio cubierto o una pérgola?",
      answer: "El costo varía significativamente según el diseño, el tamaño y las características adicionales (iluminación, cimientos, cocinas exteriores). La mayoría de los proyectos comienzan en $18,000. Ofrecemos cotizaciones gratuitas y sin compromiso para darte un precio preciso para tu proyecto específico.",
    },
    {
      question: "¿Ofrecen opciones de financiación?",
      answer: (
        <>
          <p className="mb-2">Sí, nos hemos asociado con varios prestamistas para ofrecer opciones de financiación competitivas con tasas bajas, pagos flexibles y procesos de aprobación rápidos.</p>
          <p>Llámanos al <a href="tel:+13465819082" className="text-orange-600 font-semibold hover:underline">+1 (346) 581-9082</a> para discutir tus opciones.</p>
        </>
      ),
    },
    {
      question: "¿Cuál es su proceso de construcción, de principio a fin?",
      answer: (
        <>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Consulta y Cotización: Entendemos tu visión.</li>
            <li>Diseño 3D: Creamos una visualización precisa de tu futuro patio.</li>
            <li>Aprobación del Contrato: Firma y planificación.</li>
            <li>Permisos y Preparación: Gestión de permisos y pedido de materiales.</li>
            <li>Cimentación y Base: Construcción de cimientos sólidos.</li>
            <li>Instalación de la Estructura: Montaje rápido de la pérgola o cubierta.</li>
            <li>Toques Finales: Instalación de iluminación, césped o concreto.</li>
            <li>Inspección y Disfrute: Inspección final y entrega de tu nuevo espacio.</li>
          </ol>
          <p className="mt-3">
            ¿Quieres saber más sobre nuestro proceso completo?
            <Link
              to="/how-we-doit/es" // ⬅️ Ruta ES
              onClick={scrollToTop}
              onPointerEnter={() => runIdle(prefetchProcess)}
              onFocus={() => runIdle(prefetchProcess)}
              onTouchStart={() => runIdle(prefetchProcess)}
              className="text-orange-600 font-semibold hover:underline ml-1"
            >
              Haz clic aquí para ver todos los detalles.
            </Link>
          </p>
        </>
      ),
    },
    {
      question: "¿Cuál es la garantía de sus pérgolas y cubiertas de patio?",
      answer: "Ofrecemos una garantía estructural de 5 años en todos nuestros productos de aluminio. Nuestras estructuras están diseñadas para no requerir mantenimiento y resistir el clima de Texas.",
    },
    {
      question: "¿Necesito obtener permisos de construcción en Houston?",
      answer: "Sí, la mayoría de los proyectos de construcción de patios y pérgolas en el área de Houston requieren un permiso. Gestionamos todo el proceso de permisos para garantizar que tu proyecto cumpla con las regulaciones locales.",
    },
    {
      question: "¿Qué materiales utilizan para sus estructuras?",
      answer: "Utilizamos exclusivamente aluminio de grado arquitectónico de alta calidad para nuestras pérgolas y cubiertas de patio. Este material es duradero, libre de óxido y 100% reciclable, lo que minimiza el impacto ambiental.",
    },
    {
      question: "¿Cuánto tiempo lleva la construcción de un proyecto típico?",
      answer: "El tiempo de construcción varía. Una vez que se obtienen los permisos (lo que puede llevar varias semanas), la instalación de la estructura de aluminio generalmente se completa en 3-5 días. Los proyectos más grandes o los que incluyen cimentación y cocinas exteriores tardarán más.",
    },
  ];


  // Monta contenido cuando la sección entra (además de content-visibility)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const onScreen = entries.some((e) => e.isIntersecting);
        if (onScreen) {
          setVisible(true);
          runIdle(prefetchProcess);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // JSON-LD (incluye sólo respuestas de texto plano)
  const faqJsonLd = useMemo(() => {
    const items = faqRawData
      // Filtramos las respuestas que no son solo texto (q2 y q3 son JSX)
      .filter((f) => typeof f.answer === "string")
      .map((f) => ({
        "@type": "Question",
        // ⬅️ Usamos las preguntas/respuestas traducidas
        name: f.question, 
        acceptedAnswer: { "@type": "Answer", text: f.answer as string },
      }));
    return items.length
      ? { 
          "@context": "https://schema.org", 
          "@type": "FAQPage", 
          mainEntity: items,
          // ⬅️ Añadimos nombre traducido para el JSON-LD (SEO)
          name: JSON_LD_NAME
        }
      : null;
  }, [faqRawData]);

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-heading"
      role="region"
      className="
        flex flex-col items-center justify-center
        py-12 px-6 border-t border-black/20 overflow-hidden
        [content-visibility:auto] [contain-intrinsic-size:780px]
      "
      style={{ contain: "content" as any, minHeight: 360 }}
    >
      <header className="text-center">
        <p id="faq-heading" className="font-semibold text-2xl text-[#0d4754]">
          {HEADER_SMALL_TITLE} {/* ⬅️ Traducción */}
        </p>
        <h2 className="font-semibold text-4xl text-center">
          {HEADER_LARGE_TITLE} {/* ⬅️ Traducción */}
        </h2>
        <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-5 rounded-full mx-auto" aria-hidden="true" />
      </header>

      <div className="w-full max-w-2xl">
        {visible ? (
          faqRawData.map((faq) => (
            // Las props question y answer son strings o JSX traducidos de faqData
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))
        ) : (
          // placeholder liviano mientras no está visible
          <div className="h-40" aria-hidden="true" />
        )}
      </div>

      <p className="mt-5 font-normal text-xl text-center">
        {CONTACT_PREFIX}
        <br />
        {CONTACT_TEXT_1}
        <a
          href="https://wa.me/13465819082"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-orange-600 font-semibold hover:underline"
          data-gtm="faq_whatsapp_cta"
        >
          {CONTACT_LINK} {/* ⬅️ Traducción */}
        </a>
        {CONTACT_SUFFIX}
      </p>

      <FreeQuoteButtonEs
        // ⬅️ Usamos las claves específicas del CTA de la sección FAQ
        questionText={QUOTE_QUESTION_TEXT}
        buttonText={QUOTE_BUTTON_TEXT}
        gtmId="faq_free_quote_cta"
      />

      {/* JSON-LD para SEO (solo si hay items) */}
      {faqJsonLd && <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>}
    </section>
  );
};

export default FAQEs;