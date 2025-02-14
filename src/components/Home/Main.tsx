import React from "react";

const Main: React.FC = () => {
    return (
        <main className="flex relative">
            {/* Video para pantallas grandes (md en adelante) */}
            <video 
                className="hidden md:block absolute top-0 left-0 w-full h-full object-cover max-h-[1080px]" 
                autoPlay 
                loop 
                muted 
                playsInline
            >
                <source src="/assets/videos/homevideo.webm" type="video/webm" />
                Tu navegador no soporta videos.
            </video>

            {/* Video para pantallas pequeñas (menos de md) */}
            <video 
                className="block md:hidden absolute top-0 left-0 w-full h-full object-cover max-h-[1080px]" 
                autoPlay 
                loop 
                muted 
                playsInline
            >
                <source src="/assets/videos/HOMEVIDEO-VERTICAL.webm" type="video/webm" />
                Tu navegador no soporta videos.
            </video>

            {/* Contenido encima del video */}
            <div className="flex flex-col items-start justify-center text-start relative z-10 text-white w-full h-screen max-h-[1080px] bg-black/50 pl-4">
                <div className="w-[70vw]">
                    <h1 className="text-3xl md:text-5xl font-semibold">Custom Pergolas for your Outdoor Space</h1>
                    <div className="w-80 h-[3px] bg-orange-500 mt-3 ml-1 rounded-4xl"></div>
                    <h2 className="text-3xl md:text-4xl font-neutral opacity-90">Upgrade Your Outdoor Space with Modern Patio Covers</h2>
                </div>
            </div>
        </main>
    );
};

export default Main;
