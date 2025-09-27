import React, { memo, useEffect, useRef, useState } from "react";
import { FaInstagram, FaTiktok, FaPinterest, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";

const HIGH_FETCH_ATTR: Record<string, string> = { fetchpriority: "high" };

// Prefetch de rutas que se tocan desde el hero
let patiosPrefetched = false;
const prefetchPatios = () => {
  if (patiosPrefetched) return;
  patiosPrefetched = true;
  import("../../pages/Home/PatiosAndPergolasHome").catch(() => {
    patiosPrefetched = false;
  });
};

let quotePrefetched = false;
const prefetchQuote = () => {
  if (quotePrefetched) return;
  quotePrefetched = true;
  import("../../pages/FreeQuote/FreeQuote").catch(() => {
    quotePrefetched = false;
  });
};

const Main: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false); // canplay
  const [reducedMotion, setReducedMotion] = useState(false);
  const handleScrollToTop = useScrollToTop();

  const baseUrl = import.meta.env.BASE_URL || "/";
  const poster = `${baseUrl}assets/videos/homevideo-poster.jpg`;
  const videoSrc = `${baseUrl}assets/videos/homevideo.webm`;
  const trackSrc = `${baseUrl}assets/videos/homevideo.vtt`;

  // Respeta prefers-reduced-motion
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Detecta si el hero está en viewport para reproducir/pausar y para prefetch
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const onScreen = entries.some((e) => e.isIntersecting);
        setVisible(onScreen);
        // prefetch bajo demanda
        if (onScreen) {
          // de forma ociosa
          const idle =
            (window as any).requestIdleCallback ||
            ((cb: any) => setTimeout(cb, 250));
          idle(() => {
            prefetchPatios();
            prefetchQuote();
          });
        }
      },
      { rootMargin: "0px 0px -20%", threshold: 0.1 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Controla reproducción del video según visibilidad y motion
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (visible && !reducedMotion && videoReady) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [visible, reducedMotion, videoReady]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex w-full h-screen max-h-[1080px] overflow-hidden"
      aria-labelledby="main-heading"
      style={{ contain: "layout paint size" as any }} // aisla el hero (micro anti-CLS)
    >
      {/* Poster como LCP (imagen absoluta) */}
      <img
        {...HIGH_FETCH_ATTR}
        src={poster}
        alt="Modern aluminum patio cover at sunset"
        className={`absolute top-0 left-0 w-full h-full object-cover max-h-[1080px] z-0 transition-opacity duration-500 ${
          videoReady && !reducedMotion ? "opacity-0" : "opacity-100"
        }`}
        width={1920}
        height={1080}
        loading="eager"
        decoding="async"
      />

      {/* Video de fondo (se hace visible cuando está listo) */}
      <video
        ref={videoRef}
        id="background-video"
        className={`absolute top-0 left-0 w-full h-full object-cover max-h-[1080px] z-0 transition-opacity duration-500 ${
          videoReady && !reducedMotion ? "opacity-100" : "opacity-0"
        }`}
        // Sólo dejamos que descargue metadatos; reproducimos cuando sea visible y esté listo
        preload="metadata"
        autoPlay
        muted
        playsInline
        loop
        poster={poster}
        onLoadedData={() => setVideoReady(true)}
      >
        <source src={videoSrc} type="video/webm" />
        <track kind="captions" src={trackSrc} srcLang="en" label="English" default />
        {/* fallback */}
        Your browser does not support HTML5 video.
      </video>

      {/* Capa oscura */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

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
              onClick={handleScrollToTop}
              onMouseEnter={prefetchPatios}
              onFocus={prefetchPatios}
              onTouchStart={prefetchPatios}
            >
              Aluminum Pergolas and Covered Patios for Texas Homes
            </Link>
          </h2>

          <Link
            to="/get-a-free-quote-houston"
            className="bg-orange-500 border border-white/10 text-white text-lg font-semibold px-4 py-1 rounded-full mt-4 mb-2 inline-block transition-all hover:bg-orange-600 hover:scale-102"
            onClick={handleScrollToTop}
            onMouseEnter={prefetchQuote}
            onFocus={prefetchQuote}
            onTouchStart={prefetchQuote}
            aria-label="Get a free quote for your outdoor project"
          >
            Get a Free Quote
          </Link>
        </div>

        {/* Redes sociales */}
        <div className="flex gap-2 mt-2 ml-1">
          <a href="https://www.instagram.com/newgenpatio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="w-8 h-8 text-white hover:text-pink-500 transition-colors" />
          </a>
          <a href="https://www.tiktok.com/@newgenpatio" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <FaTiktok className="w-8 h-8 text-white hover:text-white/70 transition-colors" />
          </a>
          <a href="https://www.pinterest.com/newgenpatio/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
            <FaPinterest className="w-8 h-8 text-white hover:text-red-500 transition-colors" />
          </a>
          <a href="https://www.facebook.com/newgenpatio" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF className="w-8 h-8 text-white hover:text-blue-500 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(Main);
