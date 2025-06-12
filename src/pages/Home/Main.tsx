import React, { useEffect, useState } from "react";
import { FaInstagram, FaTiktok, FaPinterest, FaFacebookF } from "react-icons/fa";
import { Link } from 'react-router-dom';
import useScrollToTop from "../../hooks/scrollToTop";

const Main: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const handleScrollToTop = useScrollToTop();

  useEffect(() => {
    const video = document.getElementById("background-video") as HTMLVideoElement;
    if (video) {
      video.onloadeddata = () => setVideoLoaded(true);
    }
  }, []);

  return (
    <section id="home" className="relative flex w-full h-screen max-h-[1080px]">
      {/* Video de fondo */}
      <video
        id="background-video"
        className={`absolute top-0 left-0 w-full h-full object-cover max-h-[1080px] transition-opacity duration-700 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/assets/videos/homevideo-poster.jpg"
      >
        <source src="/assets/videos/homevideo.webm" type="video/webm" onError={(e) => e.currentTarget.remove()} />
        <track kind="captions" src="/assets/videos/homevideo.vtt" srcLang="en" label="English" default />
        Tu navegador no soporta videos.
      </video>

      {/* Capa oscura */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

      {/* Contenido principal */}
      <div
        className="relative z-10 flex flex-col items-start justify-center text-start w-full h-full px-4 text-white"
        aria-labelledby="main-heading"
      >
        <div className="w-[90vw] sm:w-[70vw]">
          <h1 id="main-heading" className="text-2xl md:text-4xl font-bold">
            Custom Outdoor Space Builders, Cover Patios and Pergolas
          </h1>

          <div className="w-[45vw] md:w-80 h-[3px] bg-orange-700 mt-4 mb-1 ml-1 rounded-full"></div>

          <h2 className="text-xl md:text-3xl font-semibold">
            Aluminum Pergolas and Covered Patios for Texas Homes
          </h2>

          <Link
            to="/get-a-free-quote-houston"
            className="bg-orange-500 border border-white/10 text-white text-lg font-semibold px-4 py-1 rounded-full mt-4 mb-2 inline-block transition-all hover:bg-orange-600 hover:scale-102"
            onClick={handleScrollToTop}
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

export default Main;