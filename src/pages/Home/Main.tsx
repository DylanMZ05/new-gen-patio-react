import React, { useEffect, useState } from "react";
import { FaInstagram, FaTiktok, FaPinterest, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
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
    <section className="relative w-full">
      {/* Video container: full screen on desktop, limited height on mobile */}
      <div className="relative w-full h-[40vh] md:h-screen max-h-[1080px] overflow-hidden">
        {!videoLoaded && (
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: "url('/assets/videos/homevideo-poster.jpg')" }}
          />
        )}

        <video
          id="background-video"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/assets/videos/homevideo-poster.jpg"
        >
          <source src="/assets/videos/homevideo.webm" type="video/webm" />
          <track
            kind="captions"
            src="/assets/videos/homevideo.vtt"
            srcLang="en"
            label="English"
            default
          />
          Tu navegador no soporta videos.
        </video>

        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Contenido dentro del video para desktop */}
        <div
          className="relative z-20 hidden md:flex flex-col items-start justify-center text-start w-full h-full px-12 text-white"
          aria-labelledby="main-heading"
        >
          <div className="w-[60vw]">
            <h1 id="main-heading" className="text-4xl font-bold">
              Custom Outdoor Space Builders, Cover Patios and Pergolas
            </h1>

            <div className="w-[45vw] md:w-80 h-[3px] bg-orange-700 mt-4 mb-1 ml-1 rounded-full"></div>

            <h2 className="text-2xl font-semibold">
              Aluminum Pergolas and Covered Patios for Texas Homes
            </h2>

            <Link
              to="/get-a-free-quote-houston"
              className="bg-orange-500 border border-white/10 text-white text-lg font-semibold px-4 py-1 rounded-full mt-4 mb-2 inline-block transition-all hover:bg-orange-600 hover:scale-102"
              onClick={handleScrollToTop}
            >
              Get a Free Quote
            </Link>

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
        </div>
      </div>

      {/* Contenido debajo del video solo en mobile */}
      <div className="md:hidden bg-[#0d4754] text-white py-10 px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Custom Outdoor Space Builders, Cover Patios and Pergolas
        </h1>
        <h2 className="text-lg font-semibold mb-6">
          Aluminum Pergolas and Covered Patios for Texas Homes
        </h2>
        <Link
          to="/get-a-free-quote-houston"
          className="bg-orange-500 text-white text-lg font-semibold px-6 py-2 rounded-full hover:bg-orange-600 transition-all inline-block"
          onClick={handleScrollToTop}
        >
          Get a Free Quote
        </Link>

        <div className="flex gap-4 justify-center mt-6">
          <a href="https://www.instagram.com/newgenpatio/" target="_blank" aria-label="Instagram">
            <FaInstagram className="w-8 h-8 hover:text-pink-500" />
          </a>
          <a href="https://www.tiktok.com/@newgenpatio" target="_blank" aria-label="TikTok">
            <FaTiktok className="w-8 h-8 hover:text-white/70" />
          </a>
          <a href="https://www.pinterest.com/newgenpatio/" target="_blank" aria-label="Pinterest">
            <FaPinterest className="w-8 h-8 hover:text-red-500" />
          </a>
          <a href="https://www.facebook.com/newgenpatio" target="_blank" aria-label="Facebook">
            <FaFacebookF className="w-8 h-8 hover:text-blue-500" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Main;
