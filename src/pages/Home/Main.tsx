import React from "react";

const Main: React.FC = () => {
  return (
    <section id="home" className="flex relative">
      {/* Video para pantallas grandes (md en adelante) */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover max-h-[1080px]"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Background video showcasing custom pergolas"
      >
        <source src="assets/videos/homevideo.webm" type="video/webm" />
        <track
          kind="captions"
          src="assets/videos/homevideo.vtt"
          // @ts-expect-error TypeScript no reconoce srclang correctamente
          srclang="en"
          label="English"
        />
        Tu navegador no soporta videos.
      </video>

      {/* Contenido encima del video */}
      <div className="flex flex-col items-start justify-center text-start relative z-10 text-white w-full h-screen max-h-[1080px] bg-black/50 pl-4">
        <div className="w-[70vw]">
          {/* H1 optimizado para SEO */}
          <h1 className="text-3xl md:text-5xl font-semibold">
            Custom Pergolas: Enhance Your Outdoor Living Experience
          </h1>

          {/* Línea decorativa */}
          <div className="w-[45vw] md:w-80 h-[3px] bg-orange-500 mt-4 mb-1 ml-1 rounded-4xl"></div>

          {/* H2 optimizado con palabras clave relacionadas */}
          <h2 className="text-2xl md:text-4xl font-light opacity-90">
            Stylish & Durable Modern Patio Covers for Every Space
          </h2>

          {/* Párrafo breve para mejorar SEO y experiencia del usuario */}
          <p className="text-lg md:text-xl opacity-80 mt-1 max-w-[600px]">
            Transform your backyard with high-quality, weather-resistant custom
            pergolas. Perfect for any outdoor setting.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Main;
