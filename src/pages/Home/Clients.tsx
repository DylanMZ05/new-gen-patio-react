import React, {
  useRef,
  memo
} from "react";
import "../../styles/googleCards.css"; 

// =========================================================================
// 🟢 CONFIGURACIÓN ESTÁTICA
// =========================================================================
const TOTAL_REVIEW_COUNT = 173; 
const IMAGES_TO_RENDER = 10;
const imageIndexes = Array.from({ length: IMAGES_TO_RENDER }, (_, i) => i + 1);

// Componente simple para mostrar las 5 estrellas
const StaticStarRating: React.FC = memo(() => {
    return (
        <div className="flex text-yellow-500 text-xs">
            {[...Array(5)].map((_, i) => (
                <span key={`filled-${i}`} className="estrella-llena">★</span>
            ))}
        </div>
    );
});


/* =========================================================================
   COMPONENTE PRINCIPAL (CLIENTS)
   ========================================================================= */

const Clients: React.FC = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    return (
        <>
            <section
            ref={sectionRef}
            id="reviews"
            role="region"
            aria-labelledby="clients-heading"
            className="flex justify-center py-12 px-6 bg-gray-50 min-h-[500px] overflow-hidden" 
            >
                <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg p-8 md:p-10">
                    
                    <p id="clients-heading" className="font-semibold text-2xl text-center mb-6 text-gray-800">
                        What Our Customers Say
                    </p>

                    {/* ============== ENCABEZADO SUPERIOR DE GOOGLE ============== */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 pb-4 border-b border-gray-100">
                        
                        <div className="flex items-center mb-4 md:mb-0">
                            <img 
                                src="assets/images/google.webp" 
                                alt="Google Logo" 
                                className="md:w-6 h-6 mr-2" 
                            />
                            <div>
                                <p className="font-bold text-xl text-gray-800 leading-none">Excellent on Google</p>
                                <div className="flex items-center mt-1">
                                    <StaticStarRating /> 
                                    <span className="text-gray-500 text-sm ml-2 font-semibold">5.0</span>
                                    <span className="text-gray-400 text-sm ml-1">({TOTAL_REVIEW_COUNT})</span>
                                </div>
                            </div>
                        </div>

                        <a
                            href="https://www.google.com/maps/place/New+Gen+Patio/@30.029388,-95.6438573,16z/data=!4m8!3m7!1s0x25f9a3b341eb1881:0xdc05fcaf6587bc2e!8m2!3d30.0297555!4d-95.6414199!9m1!1b1!16s%2Fg%2F11kj119mzn?entry=ttu&g_ep=EgoyMDI1MTEzMC4wIKXMDSoASAFQAw%3D%3D" 
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-orange-500 text-white font-semibold text-base py-2 px-4 rounded transition-colors hover:bg-orange-600 shadow-md text-center"
                        >
                            Review us on Google
                        </a>
                    </div>


                    {/* ==========================
                        SCROLL HORIZONTAL (EJE X)
                        ========================== */}
                    <div className="relative">
                        <div 
                            className="
                                flex gap-6 overflow-x-scroll pb-4 
                                scrollbar-style
                            "
                            id="reseñas-slider-contenedor"
                        >
                            {imageIndexes.map((index) => {
                                
                                const fileName = index.toString().padStart(2, '0');
                                const imagePath = `/assets/images/opinions/${fileName}.webp`; 
                                
                                return (
                                    <div 
                                        key={index} 
                                        className="
                                            reseña-card bg-white rounded-lg p-0 shadow-sm border border-gray-100 h-auto overflow-hidden flex-shrink-0
                                            /* 🟢 CONFIGURACIÓN PARA 3 COLUMNAS EN DESKTOP Y MIN-WIDTH MENOR EN MOBILE */
                                            min-w-[70vw] /* Mobile: Un poco más pequeña */
                                            sm:min-w-[45vw]
                                            md:min-w-[31%] /* Desktop: 3 por fila */
                                            lg:min-w-[31%] 
                                        "
                                    >
                                        <a 
                                            href="https://www.google.com/search?q=new+gen+patio+reviews" 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full"
                                        >
                                            <img 
                                                src={imagePath} 
                                                alt={`Reseña ${fileName}`} 
                                                className="w-full object-contain" 
                                                loading="lazy"
                                            />
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    );
};

export default memo(Clients);