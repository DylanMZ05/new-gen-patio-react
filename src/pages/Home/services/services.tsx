// src/pages/Services/Services.tsx
import React, { memo, useMemo } from "react";
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

const Services: React.FC<ServicesProps> = ({ showQuoteButton = true }) => {
  const baseUrl = import.meta.env.BASE_URL || "/";

  // Normaliza rutas (BASE_URL + encodeURI) para que no fallen imágenes con & o espacios
  const serviceCards = useMemo<ServiceCard[]>(
    () =>
      RAW_CARDS.map((c) => ({
        ...c,
        imageUrl: `${baseUrl}${encodeURI(c.imageUrl)}`,
      })),
    [baseUrl]
  );

  // JSON-LD (ItemList) para SEO — usa URLs absolutas cuando sea posible
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
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
      id="services"
      role="region"
      aria-labelledby="services-heading"
      className="
        flex flex-col items-center justify-center
        py-12 px-6
        [content-visibility:auto] [contain-intrinsic-size:820px]
      "
      style={{ contain: "content" as any }} // aísla el layout interno (reduce layout/paint)
    >
      <header className="text-center max-w-2xl">
        <h2 id="services-heading" className="text-2xl font-semibold text-[#0d4754]">
          OUR SERVICES
        </h2>
        <p className="text-4xl font-semibold">What We Offer</p>
        <div
          className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto"
          aria-hidden="true"
        />
        <p className="text-center font-semibold text-black/80 mb-6 max-w-2xl">
          We craft premium patios, pergolas, and outdoor kitchens designed for
          style, durability, and functionality.
        </p>
      </header>

      {/* CardGrid debe reservar altura (usar aspect-ratio 16/9 dentro). */}
      <CardGrid cards={serviceCards} />

      {showQuoteButton && (
        <FreeQuoteButton
          questionText="Got a project in mind?"
          buttonText="Let’s Talk"
          gtmId="services_free_quote_cta"
        />
      )}

      {/* JSON-LD para SEO */}
      {origin && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </section>
  );
};

export default memo(Services);
