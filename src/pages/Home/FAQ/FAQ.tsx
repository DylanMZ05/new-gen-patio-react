// src/pages/YourPath/FAQ.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FAQItem from "./FAQItem";
import FreeQuoteButton from "../../../components/FreeQuoteButton";
import useScrollToTop from "../../../hooks/scrollToTop";

/* ========================= Prefetch helpers ========================= */
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

  // Datos (uno de los answers usa <Link> con el handler)
  const faqData = useMemo(
    () => [
      {
        question: "How do your pergolas differ from wooden pergolas?",
        answer:
          "Our aluminum pergolas are more durable, weather-resistant, and maintenance-free. They don't warp, crack, or rot and require no staining or sealing.",
      },
      {
        question: "How can I request a free quote?",
        answer:
          "Call +1 (346) 380-0845 or click the 'Free Quote' button on our website. It's quick and easy!",
      },
      {
        question: "What is the process from start to finish?",
        answer: (
          <>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Request a free quote online or call us.</li>
              <li>Schedule a free in-home consultation.</li>
              <li>Receive a formal quote with 3D renderings.</li>
              <li>Sign the approved proposal and submit a 25% deposit.</li>
              <li>Schedule the construction start date.</li>
              <li>Get regular updates before construction.</li>
              <li>Construction begins with our quality assurance.</li>
              <li>Final walk-through and review.</li>
            </ol>
            <p className="mt-3">
              Want to learn more{" "}
              <Link
                to="/how-we-doit"
                onClick={scrollToTop}
                onPointerEnter={() => runIdle(prefetchProcess)}
                onFocus={() => runIdle(prefetchProcess)}
                onTouchStart={() => runIdle(prefetchProcess)}
                className="text-orange-600 font-semibold hover:underline"
              >
                Click here to see our full process.
              </Link>
              .
            </p>
          </>
        ),
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept ACH transfers, checks, wire transfers, and credit cards. Flexible payment options available.",
      },
      {
        question: "What materials do you use for the roofing?",
        answer:
          "We use high-quality insulated aluminum roofing panels with a 3-inch core of compressed styrofoam. We also offer polycarbonate and methacrylate options for natural light filtering.",
      },
      {
        question: "Do you offer financing options?",
        answer:
          "Yes! We partner with Hearth Financing and VistaFi to offer up to 18 months of 0% interest financing.",
      },
      {
        question: "Where do you offer your services?",
        answer:
          "We are based in Spring, Texas, and serve clients across the entire state, focusing on the Houston area.",
      },
    ] as const,
    [scrollToTop]
  );

  // JSON-LD para SEO (incluye sólo respuestas de texto plano)
  const faqJsonLd = useMemo(() => {
    const items = faqData
      .filter((f) => typeof f.answer === "string")
      .map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer as string },
      }));
    return items.length
      ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items }
      : null;
  }, [faqData]);

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
          FAQs
        </p>
        <h2 className="font-semibold text-4xl text-center">Frequently Asked Questions</h2>
        <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-5 rounded-full mx-auto" aria-hidden="true" />
      </header>

      <div className="w-full max-w-2xl">
        {visible ? (
          faqData.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))
        ) : (
          // placeholder liviano mientras no está visible
          <div className="h-40" aria-hidden="true" />
        )}
      </div>

      <p className="mt-5 font-normal text-xl text-center">
        Have another question?
        <br />
        No problem,{" "}
        <a
          href="https://wa.me/13465819082"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-orange-600 font-semibold hover:underline"
          data-gtm="faq_whatsapp_cta"
        >
          contact us
        </a>
        .
      </p>

      <FreeQuoteButton
        questionText="Got a project in mind?"
        buttonText="Let’s Talk"
        gtmId="faq_free_quote_cta"
      />

      {/* JSON-LD para SEO (solo si hay items) */}
      {faqJsonLd && <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>}
    </section>
  );
};

export default FAQ;
