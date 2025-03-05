import React, { useEffect, useState } from "react";

const Main: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

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

      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      <div
        className="relative z-10 flex flex-col items-start justify-center text-start w-full h-full px-4 text-white"
        aria-labelledby="main-heading"
      >
        <div className="w-[90vw] sm:w-[70vw]">
          <h1 id="main-heading" className="text-3xl md:text-5xl font-semibold">
            Custom Aluminium Pergolas in Houston - New Gen Patio
          </h1>

          <div className="w-[45vw] md:w-80 h-[3px] bg-orange-500 mt-4 mb-1 ml-1 rounded-full"></div>

          <h2 className="text-2xl md:text-4xl font-light opacity-90">
            Modern, Stylish & Durable Patio Covers for Texas Homes
          </h2>

          <p className="text-lg md:text-xl opacity-80 mt-1 max-w-[600px]">
            Enhance your outdoor living space with our premium custom-built aluminium pergolas. Designed to withstand the Texas climate while adding modern elegance to your home.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Main;
