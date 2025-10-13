import React, { memo, useEffect, useMemo, useRef } from "react";
import CardGrid from "./CardGrid";
import FreeQuoteButton from "../../../components/FreeQuoteButton";

interface ServicesProps {
  showQuoteButton?: boolean;
}

type ServiceCard = {
  title: string;
  imageUrl: string;
  link: string;
  subtitle?: string;
};

/* ========================= Datos base ========================= */
const RAW_CARDS: ServiceCard[] = [
  {
    title: "Covered Patios & Pergolas",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/01.webp",
    link: "/aluminium-custom-pergola-cover-patio",
  },
  {
    title: "Outdoor Kitchens",
    imageUrl: "assets/images/Products/OutdoorKitchen/Modern/11.webp",
    link: "/custom-outdoor-kitchen",
  },
  {
    title: "Additional Services",
    imageUrl: "assets/images/Products/AdditionalServices/1.webp",
    link: "/concrete-and-turf-installation-houston",
    subtitle: "Landscaping | Concrete | Artificial Turf",
  },
];

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

/**
 * Prefetch robusto de módulos:
 * - Usa import.meta.glob para no “adivinar” paths.
 * - Sólo importa si encuentra coincidencia → no rompe el build.
 * - Ajustá los patterns si movés archivos.
 */
const routeModules = import.meta.glob([
  // ajustá/añadí los archivos reales que existan en tu repo
  "../../Home/services/PatioAndPergolasCard.tsx",
  "../../Home/services/OutdoorKitchenCards.tsx",
  "../../Home/services/AdditionalServices*.tsx",
  "../../Home/PatiosAndPergolasHome*.tsx",
  "../../OutdoorKitchen/OutdoorKitchen*.tsx",
  "../../AdditionalServices/AdditionalServices*.tsx",
]);

const safePrefetch = (predicate: (p: string) => boolean) => {
  if (!canPrefetch()) return;
  for (const path in routeModules) {
    if (predicate(path)) {
      routeModules[path]().catch(() => {});
    }
  }
};

let prefetchDone = false;
const prefetchServiceRoutesOnce = () => {
  if (prefetchDone) return;
  prefetchDone = true;
  runIdle(() => {
    // Intentamos encontrar módulos por nombre (no por carpeta fija)
    safePrefetch((p) => /Pergola|Pergolas|Patio/i.test(p));
    safePrefetch((p) => /Kitchen/i.test(p));
    safePrefetch((p) => /Additional/i.test(p));
  });
};
/* =============================================================== */

const Services: React.FC<ServicesProps> = ({ showQuoteButton = true }) => {
  const baseUrl = import.meta.env.BASE_URL || "/";
  const sectionRef = useRef<HTMLElement | null>(null);

  // Normaliza rutas (BASE_URL + encodeURI) para que no fallen imágenes con & o espacios
  const serviceCards = useMemo<ServiceCard[]>(
    () =>
      RAW_CARDS.map((c) => ({
        ...c,
        imageUrl: `${baseUrl}${encodeURI(c.imageUrl)}`,
      })),
    [baseUrl]
  );

  // Warm-up de imágenes + prefetch de rutas al acercarse la sección
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const warmImages = () => {
      runIdle(() => {
        for (const c of serviceCards) {
          const img = new Image();
          // esta propiedad existe en lib.dom.d.ts
          (img as HTMLImageElement).decoding = "async";
          img.src = c.imageUrl;
        }
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.some((e) => e.isIntersecting);
        if (vis) {
          warmImages();
          prefetchServiceRoutesOnce();
          io.disconnect(); // una sola vez
        }
      },
      { rootMargin: "1200px 0px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [serviceCards]);

  // JSON-LD (ItemList) para SEO — usa URLs absolutas cuando sea posible
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const jsonLd = useMemo(() => {
    const itemListElement = serviceCards.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${origin}${c.link}`,
      item: {
        "@type": "Service",
        name: c.title,
        image: origin ? `${origin}/${c.imageUrl.replace(/^\//, "")}` : c.imageUrl,
        url: `${origin}${c.link}`,
        description: c.subtitle || undefined,
      },
    }));
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement,
      name: "New Gen Patio - Services",
    };
  }, [serviceCards, origin]);

  return (
    <section
      ref={sectionRef}
      id="services"
      role="region"
      aria-labelledby="services-heading"
      className="
        flex flex-col items-center justify-center
        py-12 px-6
        [content-visibility:auto] [contain-intrinsic-size:820px]
      "
      // aislamos layout/paint dentro y aportamos una altura mínima de seguridad (anti-CLS)
      style={{ contain: "content" as any, minHeight: "320px" }}
    >
      <header className="text-center max-w-2xl">
        <h2 id="services-heading" className="text-2xl font-semibold text-[#0d4754]">
          OUR SERVICES
        </h2>
        <p className="text-4xl font-semibold">What We Offer</p>
        <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto" aria-hidden="true" />
        <p className="text-center font-semibold text-black/80 mb-6 max-w-2xl">
          We craft premium patios, pergolas, and outdoor kitchens designed for
          style, durability, and functionality.
        </p>
      </header>

      {/* CardGrid debería reservar altura interna (usa aspect-ratio 16/9 en cada card). */}
      <CardGrid cards={serviceCards} />

      {showQuoteButton && (
        <FreeQuoteButton
          questionText="Got a project in mind?"
          buttonText="Let’s Talk"
          gtmId="services_free_quote_cta"
        />
      )}

      {/* JSON-LD para SEO */}
      {origin && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </section>
  );
};

export default memo(Services);
