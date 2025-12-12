// src/pages/YourPath/FAQ.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FAQItem from "./FAQItem";
import FreeQuoteButton from "../../../components/FreeQuoteButton";
import useScrollToTop from "../../../hooks/scrollToTop";
import { useTranslation } from "react-i18next"; // ⬅️ Nuevo: Importamos useTranslation

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

const FAQ: React.FC = () => {
  // ⬅️ CRÍTICO: Usamos el namespace 'faq' y 'common' para los botones
  const { t } = useTranslation(['faq', 'common']);

  const scrollToTop = useScrollToTop();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

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

  // ⬅️ CRÍTICO: Datos traducidos. El useMemo depende de 't'
  const faqData = useMemo(
    () => [
      {
        question: t('q1-title'),
        answer: t('q1-answer'),
      },
      {
        question: t('q2-title'),
        answer: t('q2-answer', { phone: '+1 (346) 581-9082' }), // Usamos interpolación para el teléfono
      },
      {
        question: t('q3-title'),
        // La respuesta con JSX debe construirse usando la traducción de los fragmentos
        answer: (
          <>
            <ol className="list-decimal pl-5 space-y-1">
              <li>{t('q3-step-1')}</li>
              <li>{t('q3-step-2')}</li>
              <li>{t('q3-step-3')}</li>
              <li>{t('q3-step-4')}</li>
              <li>{t('q3-step-5')}</li>
              <li>{t('q3-step-6')}</li>
              <li>{t('q3-step-7')}</li>
              <li>{t('q3-step-8')}</li>
            </ol>
            <p className="mt-3">
              {t('q3-link-prefix', { defaultValue: "Want to learn more " })}
              <Link
                to="/how-we-doit"
                onClick={scrollToTop}
                onPointerEnter={() => runIdle(prefetchProcess)}
                onFocus={() => runIdle(prefetchProcess)}
                onTouchStart={() => runIdle(prefetchProcess)}
                className="text-orange-600 font-semibold hover:underline"
              >
                {t('q3-link-text', { defaultValue: "Click here to see our full process" })}
              </Link>
              {t('q3-link-suffix', { defaultValue: "." })}
            </p>
          </>
        ),
      },
      {
        question: t('q4-title'),
        answer: t('q4-answer'),
      },
      {
        question: t('q5-title'),
        answer: t('q5-answer'),
      },
      {
        question: t('q6-title'),
        answer: t('q6-answer'),
      },
      {
        question: t('q7-title'),
        answer: t('q7-answer'),
      },
    ],
    [scrollToTop, t] // ⬅️ CRÍTICO: Dependencia de 't' para que se actualice la traducción
  );

  // JSON-LD (incluye sólo respuestas de texto plano)
  const faqJsonLd = useMemo(() => {
    const items = faqData
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
          name: t('json-ld-name', { defaultValue: "New Gen Patio - Frequently Asked Questions" })
        }
      : null;
  }, [faqData, t]);

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
          {t('header-small-title', { defaultValue: "FAQs" })} {/* ⬅️ Traducción */}
        </p>
        <h2 className="font-semibold text-4xl text-center">
          {t('header-large-title', { defaultValue: "Frequently Asked Questions" })} {/* ⬅️ Traducción */}
        </h2>
        <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-5 rounded-full mx-auto" aria-hidden="true" />
      </header>

      <div className="w-full max-w-2xl">
        {visible ? (
          faqData.map((faq) => (
            // Las props question y answer son strings o JSX traducidos de faqData
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))
        ) : (
          // placeholder liviano mientras no está visible
          <div className="h-40" aria-hidden="true" />
        )}
      </div>

      <p className="mt-5 font-normal text-xl text-center">
        {t('contact-prefix', { defaultValue: "Have another question?" })}
        <br />
        {t('contact-text-1', { defaultValue: "No problem, " })}
        <a
          href="https://wa.me/13465819082"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-orange-600 font-semibold hover:underline"
          data-gtm="faq_whatsapp_cta"
        >
          {t('contact-link', { defaultValue: "contact us" })} {/* ⬅️ Traducción */}
        </a>
        {t('contact-suffix', { defaultValue: "." })}
      </p>

      <FreeQuoteButton
        // ⬅️ Usamos las claves específicas del CTA de la sección FAQ
        questionText={t('common:quote-question-faq', { defaultValue: "Got a project in mind?" })}
        buttonText={t('common:quote-button-faq', { defaultValue: "Let’s Talk" })}
        gtmId="faq_free_quote_cta"
      />

      {/* JSON-LD para SEO (solo si hay items) */}
      {faqJsonLd && <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>}
    </section>
  );
};

export default FAQ;