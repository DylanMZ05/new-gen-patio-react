import React from 'react';

// --- DATOS DEL NEGOCIO (LocalBusiness) ---
const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "New Gen Patio",
  "description": "Empresa líder en diseño y construcción de exteriores en Houston, especializada en pérgolas de aluminio, cocinas de exterior y pavimentación.",
  "url": "https://www.newgenpatio.com",
  "image": "https://www.newgenpatio.com/assets/images/logo.png", 
  "telephone": "+1-832-XXX-XXXX", // <--- ¡PON TU TELÉFONO REAL AQUÍ!
  "email": "contact@newgenpatio.com", // <--- ¡PON TU EMAIL REAL AQUÍ!
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Houston",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 29.7604, 
    "longitude": -95.3698
  },
  "serviceArea": {
    "@type": "City",
    "name": "Houston Metro Area"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "08:00",
    "closes": "18:00"
  },
  "priceRange": "$$$",
  "sameAs": [
    "https://www.facebook.com/newgenpatio",
    "https://www.instagram.com/newgenpatio",
    "https://www.linkedin.com/company/new-gen-patio"
  ],
  // 🟢 MEJORA CLAVE: AGGREGATERATING PARA CITAS DE IA Y RICH SNIPPETS
  // Debes actualizar estos números con tus datos reales de Google My Business o una fuente validada.
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "185" // Número total de reseñas
  }
};

// --- DATOS DE PREGUNTAS FRECUENTES (FAQPage) ---
const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuáles son los servicios principales de New Gen Patio en Houston?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "New Gen Patio se especializa en el diseño y la construcción de espacios de vida exteriores. Nuestros servicios principales son las pérgolas y cubiertas de patio de aluminio a medida, la instalación de cocinas de exterior personalizadas y la instalación de pavimentación con concreto y césped artificial."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué diferencia a las pérgolas de aluminio de New Gen Patio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nuestras pérgolas se fabrican con aluminio estructural de grado premium, que no se oxida, no requiere pintura y resiste el clima extremo de Texas. Ofrecen una durabilidad superior con un mantenimiento casi nulo."
      }
    },
    {
      "@type": "Question",
      "name": "¿En qué zonas de Houston prestan servicios?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prestamos servicios en toda el área metropolitana de Houston, incluyendo Katy, Sugar Land, The Woodlands, Cypress y Fulshear."
      }
    },
    {
      "@type": "Question",
      "name": "¿Ofrecen garantía en sus proyectos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, ofrecemos una garantía de 10 años en todos los materiales estructurales de aluminio y garantía en la mano de obra para asegurar su inversión."
      }
    }
  ]
};

/**
 * Componente que inyecta datos estructurados JSON-LD en el head del documento.
 * @param {object} props
 * @param {'business' | 'faq'} props.type - Define el tipo de Schema a inyectar ('business' o 'faq').
 */
const SchemaMarkup = ({ type }) => {
  let data = {};

  if (type === 'business') {
    data = localBusinessData;
  } else if (type === 'faq') {
    data = faqData;
  } else {
    return null;
  }

  if (Object.keys(data).length === 0) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default SchemaMarkup;