import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useScrollToTop from "../../../hooks/scrollToTop";
// ❌ Eliminado: import { useTranslation } from "react-i18next";

/* ========================= Prefetch helpers ========================= */
const canPrefetch = () => {
  if (typeof navigator !== "undefined") {
    const conn = (navigator as any).connection;
    if (conn?.saveData) return false;
    const type = String(conn?.effectiveType || "").toLowerCase();
    if (type.includes("2g") || type.includes("slow-2g")) return false;
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

// Prefetch de rutas tocadas desde el hero
let patiosPrefetched = false;
const prefetchPatios = () => {
  if (patiosPrefetched || !canPrefetch()) return;
  patiosPrefetched = true;
  // Ruta de prefetch para la versión ES
  import("./PatiosAndPergolasHomeEs").catch(() => { // Corregido: apunto al componente ES
    patiosPrefetched = false;
  });
};

let quotePrefetched = false;
const prefetchQuote = () => {
  if (quotePrefetched || !canPrefetch()) return;
  quotePrefetched = true;
  // Ruta de prefetch para la versión ES
  import("../FreeQuoteEs/FreeQuoteEs").catch(() => {
    quotePrefetched = false;
  });
};
/* =================================================================== */

const MainEs: React.FC = () => {
  // ❌ Eliminado: const { t } = useTranslation('home');

  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [visible, setVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const scrollToTop = useScrollToTop();

  const baseUrl = import.meta.env.BASE_URL || "/";
  
  // Rutas de archivos (se asume que están en el directorio público, se mantiene el patrón original)
  const posterJpg = `${baseUrl}assets/videos/homevideo-poster.jpg`;
  const posterWebp = `${baseUrl}assets/videos/homevideo-poster.webp`;
  const posterAvif = `${baseUrl}assets/videos/homevideo-poster.avif`;
  
  // Usamos la ruta relativa para el fallback si el componente está anidado en español/pages/Home
  const fallbackImg = `../../assets/images/Products/Patios&Pergolas/Attached/18.webp`; 

  const videoSrcWebm = `${baseUrl}assets/videos/homevideo.webm`;
  const videoSrcMp4 = `${baseUrl}assets/videos/homevideo.mp4`;
  const trackSrc = `${baseUrl}assets/videos/homevideo.vtt`;

  /* ===== prefers-reduced-motion ===== */
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* ===== IntersectionObserver ===== */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const onScreen = entries.some((e) => e.isIntersecting);
        setVisible(onScreen);
        if (onScreen) {
          runIdle(prefetchPatios);
          runIdle(prefetchQuote);
        }
      },
      { rootMargin: "0px 0px -20%", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ===== Play/Pause ===== */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (visible && !reducedMotion && videoReady && !videoError) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [visible, reducedMotion, videoReady, videoError]);

  /* ===== Pausar si pestaña oculta ===== */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onVis = () => {
      if (document.visibilityState === "hidden") v.pause();
      else if (visible && !reducedMotion && videoReady && !videoError) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [visible, reducedMotion, videoReady, videoError]);

  const onPatiosIntent = useCallback(() => runIdle(prefetchPatios), []);
  const onQuoteIntent = useCallback(() => runIdle(prefetchQuote), []);

  // === TEXTOS TRADUCIDOS ===
  const IMAGE_ALT_POSTER = "Cubierta de patio de aluminio moderna al atardecer";
  const IMAGE_ALT_FALLBACK = "Imagen de respaldo de proyecto de patio";
  const MAIN_HEADING = "Constructores de Pérgolas de Aluminio y Patios Cubiertos de Lujo a Medida";
  const SUBHEADING = "Transforma tu espacio exterior con nosotros. Diseños personalizados, garantía de por vida e instalación experta.";
  const QUOTE_ARIA_LABEL = "Obtener presupuesto gratuito para tu proyecto exterior";
  const QUOTE_BUTTON = "Pedir Presupuesto Gratis";


  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex w-full h-screen max-h-[1080px] overflow-hidden"
      aria-labelledby="main-heading"
      style={{ contain: "layout paint size" } as any}
    >
      <Helmet>
        <link rel="preconnect" href={window.location.origin} crossOrigin="" />
        <link
          rel="preload"
          as="image"
          href={posterWebp}
          imageSrcSet={`${posterWebp} 1920w, ${posterJpg} 1920w`}
          imageSizes="100vw"
        />
      </Helmet>

      {/* ===== Poster inicial (visible mientras se carga el video o si falla) ===== */}
      <picture
        className={`absolute top-0 left-0 w-full h-full z-0 transition-opacity duration-700 ${
          videoReady && !videoError ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
        style={{ pointerEvents: "none", willChange: "opacity" }}
      >
        <source type="image/avif" srcSet={posterAvif} sizes="100vw" />
        <source type="image/webp" srcSet={posterWebp} sizes="100vw" />
        <img
          src={posterJpg}
          // ✅ Texto plano traducido
          alt={IMAGE_ALT_POSTER}
          className="w-full h-full object-cover max-h-[1080px]"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          draggable={false}
        />
      </picture>

      {/* ===== Video de fondo ===== */}
      {!videoError && (
        <video
          ref={videoRef}
          id="background-video"
          className={`absolute top-0 left-0 w-full h-full object-cover max-h-[1080px] z-0 transition-opacity duration-700 ${
            videoReady && !reducedMotion ? "opacity-100" : "opacity-0"
          }`}
          preload="none"
          autoPlay
          muted
          playsInline
          loop
          style={{ pointerEvents: "none", willChange: "opacity" }}
          poster={posterWebp}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoError(true)}
          aria-hidden="true"
        >
          <source src={videoSrcWebm} type="video/webm" />
          <source src={videoSrcMp4} type="video/mp4" />
          {/* Pista de subtítulos (mantener en inglés si el video no tiene pista en español) */}
          <track kind="captions" src={trackSrc} srcLang="en" label="English" />
        </video>
      )}

      {/* ===== Imagen fallback si falla el video ===== */}
      {videoError && (
        <img
          src={fallbackImg}
          // ✅ Texto plano traducido
          alt={IMAGE_ALT_FALLBACK}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Capa oscura */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
      />

      {/* Contenido principal */}
      <div className="relative z-20 flex flex-col items-start justify-center text-start w-full h-full px-4 text-white">
        <div className="w-[90vw] sm:w-[70vw]">
          <h1 id="main-heading" className="text-2xl md:text-4xl font-bold">
            {/* ✅ Título Principal (H1) en texto plano */}
            {MAIN_HEADING}
          </h1>

          <div className="w-[45vw] md:w-80 h-[3px] bg-orange-700 mt-4 mb-1 ml-1 rounded-full" />

          <h2 className="text-xl md:text-3xl font-semibold">
            <Link
              to="/aluminium-custom-pergola-cover-patio/es" // <-- Ruta ES
              className="text-inherit hover:underline"
              onClick={scrollToTop}
              onPointerEnter={onPatiosIntent}
              onFocus={onPatiosIntent}
              onTouchStart={onPatiosIntent}
            >
              {/* ✅ Subtítulo (H2/Link) en texto plano */}
              {SUBHEADING}
            </Link>
          </h2>

          <Link
            to="/get-a-free-quote-houston/es" // <-- Ruta ES
            className="
              bg-orange-500 border border-white/10 text-white text-lg font-semibold px-4 py-1 rounded-full mt-4 mb-2 inline-block
              transition-transform transition-colors duration-200 hover:bg-orange-600 hover:scale-105
              focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300
              motion-reduce:transform-none motion-reduce:transition-none
            "
            onClick={scrollToTop}
            onPointerEnter={onQuoteIntent}
            onFocus={onQuoteIntent}
            onTouchStart={onQuoteIntent}
            // ✅ aria-label del botón en texto plano
            aria-label={QUOTE_ARIA_LABEL}
          >
            {/* ✅ Texto del botón en texto plano */}
            {QUOTE_BUTTON}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default memo(MainEs);