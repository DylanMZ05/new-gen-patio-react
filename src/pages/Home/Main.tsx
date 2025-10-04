import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import { FaInstagram, FaTiktok, FaPinterest, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";

/* ========================= Prefetch helpers ========================= */
const canPrefetch = () => {
  if (typeof navigator !== "undefined") {
    const conn = (navigator as any).connection;
    if (conn?.saveData) return false;
    const type = String(conn?.effectiveType || "").toLowerCase();
    if (type.includes("2g") || type.includes("slow-2g")) return false;
  }
  if (typeof document !== "undefined" && document.visibilityState === "hidden") {
    return false;
  }
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
  import("../../pages/Home/PatiosAndPergolasHome").catch(() => {
    patiosPrefetched = false;
  });
};

let quotePrefetched = false;
const prefetchQuote = () => {
  if (quotePrefetched || !canPrefetch()) return;
  quotePrefetched = true;
  import("../../pages/FreeQuote/FreeQuote").catch(() => {
    quotePrefetched = false;
  });
};
/* =================================================================== */

const Main: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [visible, setVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false); // canplay
  const [reducedMotion, setReducedMotion] = useState(false);

  const scrollToTop = useScrollToTop();

  const baseUrl = import.meta.env.BASE_URL || "/";
  const poster = `${baseUrl}assets/videos/homevideo-poster.jpg`;
  const videoSrcWebm = `${baseUrl}assets/videos/homevideo.webm`;
  const trackSrc = `${baseUrl}assets/videos/homevideo.vtt`;

  /* ===== Respecta prefers-reduced-motion ===== */
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* ===== Observa el hero para prefetch y reproducción ===== */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const onScreen = entries.some((e) => e.isIntersecting);
        setVisible(onScreen);

        if (onScreen) {
          // Prefetch en idle cuando el hero entra en viewport
          runIdle(prefetchPatios);
          runIdle(prefetchQuote);
        }
      },
      { rootMargin: "0px 0px -20%", threshold: 0.1 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ===== Pausa/reanuda según visibilidad, motion y readiness ===== */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (visible && !reducedMotion && videoReady) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [visible, reducedMotion, videoReady]);

  /* ===== Pausar si la pestaña se oculta ===== */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onVis = () => {
      if (document.visibilityState === "hidden") v.pause();
      else if (visible && !reducedMotion && videoReady) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [visible, reducedMotion, videoReady]);

  const onPatiosIntent = useCallback(() => runIdle(prefetchPatios), []);
  const onQuoteIntent = useCallback(() => runIdle(prefetchQuote), []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex w-full h-screen max-h-[1080px] overflow-hidden"
      aria-labelledby="main-heading"
      style={{ contain: "layout paint size" } as any} // aísla el hero (micro anti-CLS)
    >
      {/* Poster como LCP (imagen absoluta) */}
      <img
        src={poster}
        alt="Modern aluminum patio cover at sunset"
        className={`absolute top-0 left-0 w-full h-full object-cover max-h-[1080px] z-0 transition-opacity duration-500
          ${videoReady && !reducedMotion ? "opacity-0" : "opacity-100"}
          motion-reduce:transition-none
        `}
        width={1920}
        height={1080}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />

      {/* Video de fondo (se hace visible cuando está listo) */}
      <video
        ref={videoRef}
        id="background-video"
        className={`absolute top-0 left-0 w-full h-full object-cover max-h-[1080px] z-0 transition-opacity duration-500
          ${videoReady && !reducedMotion ? "opacity-100" : "opacity-0"}
          motion-reduce:transition-none
        `}
        preload="metadata"
        autoPlay
        muted
        playsInline
        loop
        poster={poster}
        // 'canplay' asegura que hay datos para iniciar fluido
        onCanPlay={() => setVideoReady(true)}
      >
        <source src={videoSrcWebm} type="video/webm" />
        {/* Si tienes MP4, puedes descomentar y apuntar al archivo:
        <source src={`${baseUrl}assets/videos/homevideo.mp4`} type="video/mp4" />
        */}
        <track kind="captions" src={trackSrc} srcLang="en" label="English" default />
        Your browser does not support HTML5 video.
      </video>

      {/* Capa oscura */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" aria-hidden="true" />

      {/* Contenido principal */}
      <div className="relative z-20 flex flex-col items-start justify-center text-start w-full h-full px-4 text-white">
        <div className="w-[90vw] sm:w-[70vw]">
          <h1 id="main-heading" className="text-2xl md:text-4xl font-bold">
            Custom Aluminium Outdoor Space Builders, Cover Patios and Pergolas
          </h1>

          <div className="w-[45vw] md:w-80 h-[3px] bg-orange-700 mt-4 mb-1 ml-1 rounded-full" />

          <h2 className="text-xl md:text-3xl font-semibold">
            <Link
              to="/aluminium-custom-pergola-cover-patio"
              className="text-inherit hover:underline"
              onClick={scrollToTop}
              onPointerEnter={onPatiosIntent}
              onFocus={onPatiosIntent}
              onTouchStart={onPatiosIntent}
            >
              Aluminum Pergolas and Covered Patios for Texas Homes
            </Link>
          </h2>

          <Link
            to="/get-a-free-quote-houston"
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
            aria-label="Get a free quote for your outdoor project"
          >
            Get a Free Quote
          </Link>
        </div>

        {/* Redes sociales */}
        <div className="flex gap-2 mt-2 ml-1">
          <a
            href="https://www.instagram.com/newgenpatio/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Instagram"
          >
            <FaInstagram className="w-8 h-8 text-white hover:text-pink-500 transition-colors" />
          </a>
          <a
            href="https://www.tiktok.com/@newgenpatio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <FaTiktok className="w-8 h-8 text-white hover:text-white/70 transition-colors" />
          </a>
          <a
            href="https://www.pinterest.com/newgenpatio/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pinterest"
          >
            <FaPinterest className="w-8 h-8 text-white hover:text-red-500 transition-colors" />
          </a>
          <a
            href="https://www.facebook.com/newgenpatio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF className="w-8 h-8 text-white hover:text-blue-500 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(Main);
