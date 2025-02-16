import "../../styles/googleCards.css";
import React, { useRef, useState, useEffect } from "react";

const images: string[] = [
    "assets/images/opinions/1.jpeg",
    "assets/images/opinions/2.jpeg",
    "assets/images/opinions/3.jpeg",
    "assets/images/opinions/4.jpeg",
    "assets/images/opinions/5.jpeg",
    "assets/images/opinions/6.jpeg",
    "assets/images/opinions/7.jpeg",
    "assets/images/opinions/8.jpeg",
    "assets/images/opinions/9.jpeg",
    "assets/images/opinions/10.jpeg",
    "assets/images/opinions/11.jpeg",
    "assets/images/opinions/12.jpeg",
];

const Clients: React.FC = () => {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Iniciar el arrastre
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!marqueeRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - marqueeRef.current.offsetLeft);
        setScrollLeft(marqueeRef.current.scrollLeft);
        setIsPaused(true); // Pausar animación mientras se arrastra
    };

    // Movimiento del arrastre
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !marqueeRef.current) return;
        e.preventDefault();
        const x = e.pageX - marqueeRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Velocidad de desplazamiento
        marqueeRef.current.scrollLeft = scrollLeft - walk;
    };

    // Soltar el arrastre
    const handleMouseUp = () => {
        setIsDragging(false);
        setIsPaused(false); // Reanudar animación después de soltar
    };

    // Desplazamiento infinito suave
    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee) return;

        let animationFrame: number;
        const speed = 1;

        const smoothScroll = () => {
            if (!isPaused) {
                marquee.scrollLeft += speed;
                if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
                    marquee.scrollLeft = 0; // Reinicio sin corte brusco
                }
            }
            animationFrame = requestAnimationFrame(smoothScroll);
        };

        animationFrame = requestAnimationFrame(smoothScroll);
        return () => cancelAnimationFrame(animationFrame);
    }, [isPaused]);

    return (
        <section className="flex flex-col items-center justify-center py-12 px-6 border-t border-black/20 overflow-hidden">
            <h2 className="font-semibold text-4xl text-center">Our Clients</h2>
            <div className="w-25 h-1 background-skyblue mt-4 mb-5 rounded-4xl"></div>

            <div 
                className="marquee-container-google relative overflow-hidden cursor-grab active:cursor-grabbing"
                ref={marqueeRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div className="marquee flex">
                    {[...images, ...images].map((image, index) => (
                        <div
                            key={index} 
                            className="flex gap-4 items-start"
                        >
                            <div className="bg-white w-80 h-64 flex items-start justify-center p-3 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
                                <img
                                    src={image}
                                    alt={`Client ${index + 1}`}
                                    className="max-w-full max-h-full object-contain"
                                    draggable="false"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <p className="mt-5">Have another questio?
                <br />
                No problem, <a href="/new-gen-patio-react/">contact us</a>
                .
            </p>

        </section>
    );
};

export default Clients;