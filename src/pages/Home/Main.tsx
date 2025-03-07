import React, { useEffect, useState } from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
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
      <video
        id="background-video"
        className={`absolute top-0 left-0 w-full h-full object-cover max-h-[1080px] transition-opacity duration-700 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        loop
        muted
        playsInline
        title="Custom Aluminium Pergolas in Houston - Background Video"
      >
        <source src="assets/videos/homevideo.webm" type="video/webm" />
        <track
          kind="captions"
          src="assets/videos/homevideo.vtt"
          default
          {...{ srclang: "en" }}
          label="English"
        />
        Tu navegador no soporta videos.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

      <div
        className="relative z-10 flex flex-col items-start justify-center text-start w-full h-full px-4 text-white"
        aria-labelledby="main-heading"
      >
        <div className="w-[90vw] sm:w-[70vw]">
          <h1 id="main-heading" className="text-3xl md:text-5xl font-semibold">
            Custom Aluminium Pergolas in Houston
          </h1>

          <div className="w-[45vw] md:w-80 h-[3px] bg-orange-500 mt-4 mb-1 ml-1 rounded-full"></div>

          <h2 className="text-2xl md:text-4xl font-normal opacity-90">
            Modern & Durable Pergolas and Covered Patio for Texas Homes
          </h2>


          <Link
          to="/aboutus"
          className="bg-orange-500 text-white text-lg font-semibold px-4 py-1 rounded-full mt-4 mb-2 inline-block 
            transition-all hover:bg-orange-600 hover:scale-102"
          onClick={handleScrollToTop}
        >
          Discover Our Story
        </Link>

        </div>
        <div className="flex gap-2 mt-2 ml-1">
          <a
            href="https://www.instagram.com/newgenpatio/"
            target="_blank"
            rel="noopener noreferrer"
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
        </div>
      </div>
    </section>
  );
};

export default Main;
