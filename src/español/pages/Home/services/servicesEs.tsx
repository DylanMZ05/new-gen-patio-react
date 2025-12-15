import React, { memo, useEffect, useMemo, useRef } from "react";
import CardGrid from "./CardGridEs";
import FreeQuoteButtonEs from "../../../components/FreeQuoteButtonEs";
// ❌ ELIMINADO: import { useTranslation } from "react-i18next"; // ⬅️ Nuevo: Importamos useTranslation

interface ServicesProps {
  showQuoteButton?: boolean;
}

type ServiceCard = {
  title: string;
  imageUrl: string;
  link: string;
  subtitle?: string;
  // ⬅️ La clave 'key' ya no se usa para traducción aquí
  key: string; 
};

/* ========================= Datos base (TRADUCIDOS y con Rutas ES) ========================= */
const RAW_CARDS_ES = [
  {
    key: "patios-and-pergolas",
    title: "Patios Cubiertos y Pérgolas", // ✅ Traducido
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/01.webp",
    link: "/aluminium-custom-pergola-cover-patio/es", // ✅ Ruta ES
  },
  {
    key: "outdoor-kitchens",
    title: "Cocinas Exteriores", // ✅ Traducido
    imageUrl: "assets/images/Products/OutdoorKitchen/Modern/11.webp",
    link: "/custom-outdoor-kitchen/es", // ✅ Ruta ES
  },
  {
    key: "additional-services",
    title: "Servicios Adicionales", // ✅ Traducido
    imageUrl: "assets/images/Products/AdditionalServices/1.webp",
    subtitle: "Paisajismo | Concreto | Césped Artificial", // ✅ Subtítulo traducido
    link: "/concrete-and-turf-installation-houston/es", // ✅ Ruta ES
  },
];

/* ========================= Prefetch helpers (Sin cambios) ========================= */
const canPrefetch = () => {
    // ... (código canPrefetch)
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


const ServicesEs: React.FC<ServicesProps> = ({ showQuoteButton = true }) => {
    // ❌ ELIMINADO: const { t } = useTranslation(['services', 'common']);

    const baseUrl = import.meta.env.BASE_URL || "/";
    const sectionRef = useRef<HTMLElement | null>(null);

    // Utilizamos directamente RAW_CARDS_ES con las URLs ajustadas para ES
    const serviceCards = useMemo<ServiceCard[]>(
        () =>
            RAW_CARDS_ES.map((c) => ({
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
    
    // Traducciones de texto fijo para el JSON-LD
    const JSON_LD_LIST_NAME = "New Gen Patio - Servicios";

    const jsonLd = useMemo(() => {
        const itemListElement = serviceCards.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${origin}${c.link}`,
            item: {
                "@type": "Service",
                // ⬅️ Usamos el título traducido del arreglo RAW_CARDS_ES
                name: c.title, 
                image: origin ? `${origin}/${c.imageUrl.replace(/^\//, "")}` : c.imageUrl,
                url: `${origin}${c.link}`,
                // ⬅️ Usamos el subtítulo traducido del arreglo RAW_CARDS_ES
                description: c.subtitle || undefined, 
            },
        }));
        return {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement,
            // ⬅️ Traducción: Nombre de la lista
            name: JSON_LD_LIST_NAME, 
        };
    }, [serviceCards, origin]);

    // === TEXTOS TRADUCIDOS FIJOS ===
    const HEADER_TITLE_1 = "NUESTROS SERVICIOS";
    const HEADER_TITLE_2 = "Lo Que Ofrecemos";
    const HEADER_DESCRIPTION = "Diseñamos y construimos espacios exteriores duraderos y hermosos, utilizando materiales de alta calidad y diseños innovadores para tu hogar en Houston. Haz realidad la visión de tu patio trasero.";
    const QUOTE_BUTTON_QUESTION = "¿Tienes un proyecto en mente?";
    const QUOTE_BUTTON_CTA = "¡Hablemos!";


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
                {/* ⬅️ Traducción: Título 1 (NUESTROS SERVICIOS) */}
                <h2 id="services-heading" className="text-2xl font-semibold text-[#0d4754]">
                    {HEADER_TITLE_1} 
                </h2>
                {/* ⬅️ Traducción: Título 2 (Lo Que Ofrecemos) */}
                <p className="text-4xl font-semibold">{HEADER_TITLE_2}</p>
                <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto" aria-hidden="true" />
                {/* ⬅️ Traducción: Párrafo de descripción */}
                <p className="text-center font-semibold text-black/80 mb-6 max-w-2xl">
                    {HEADER_DESCRIPTION}
                </p>
            </header>

            {/* CardGrid debería reservar altura interna (usa aspect-ratio 16/9 en cada card). */}
            <CardGrid cards={serviceCards} />

            {showQuoteButton && (
                <FreeQuoteButtonEs
                    questionText={QUOTE_BUTTON_QUESTION}
                    buttonText={QUOTE_BUTTON_CTA}
                    gtmId="services_free_quote_cta"
                />
            )}

            {/* JSON-LD para SEO */}
            {origin && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
        </section>
    );
};

export default memo(ServicesEs);