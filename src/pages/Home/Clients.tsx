import React, {
  useRef,
  useEffect,
  memo,
} from "react";
// Importa tus estilos de componente
import "../../styles/googleCards.css"; 

/* === Lógica de Marquee, Elfsight y Lógica de Scroll de Botones COMENTADOS === */

// Define un tipo para las reseñas
interface Review {
  autor: string;
  puntuacion: number;
  texto: string;
  fecha: string;
  inicial: string; 
  color: string; 
}

/* =========================================================================
   SIMULACIÓN DE DATOS (REEMPLAZAR POR LA LLAMADA REAL AL BACKEND)
   
   Estos datos simulan que tu BACKEND ya los FILTRÓ (solo 4 o 5 estrellas).
   ========================================================================= */

const DUMMY_REVIEWS: Review[] = [
    {
        autor: "Scott M.",
        puntuacion: 5,
        texto: "New Gen Patio Exceeded Every Expectation! I can't say enough good things about NewGen. They were very kind to work with.",
        fecha: "3 days ago",
        inicial: "S",
        color: "bg-purple-500"
    },
    {
        autor: "Toufic",
        puntuacion: 5,
        texto: "I am very pleased with NewGen. They did an outdoor kitchen for us and the quality is excellent and the price is very reasonable. The sales person Daniel was very kind and easy to work with. We are extremely happy.",
        fecha: "18 days ago",
        inicial: "T",
        color: "bg-amber-600"
    },
    {
        autor: "Shaun",
        puntuacion: 4,
        texto: "Rafael and Alejandro at New Gen Patio are exceptional. They have been incredibly thorough in their communication and punctual. The installation was fantastic. I highly recommend their service.",
        fecha: "18 days ago",
        inicial: "S",
        color: "bg-orange-500"
    },
    {
        autor: "Jose",
        puntuacion: 4,
        texto: "The best experience ever, very professional and really easy process to get all the permits to install my patio cover. Luis was my sales representative and he was very responsive and helpful.",
        fecha: "22 days ago",
        inicial: "J",
        color: "bg-blue-600"
    },
    {
        autor: "Christian",
        puntuacion: 5,
        texto: "I highly recommend New Gen Patio since day one they were very professional. Javier was my sales representative and he was very helpful.",
        fecha: "28 days ago",
        inicial: "C",
        color: "bg-cyan-600"
    },
    {
        autor: "Maria L.",
        puntuacion: 5,
        texto: "Calidad excelente y atención al detalle. ¡Quedé impresionada con el resultado final de mi patio!",
        fecha: "1 month ago",
        inicial: "M",
        color: "bg-pink-500"
    },
    {
        autor: "Pedro R.",
        puntuacion: 4,
        texto: "Muy buen trabajo, llegaron a tiempo y cumplieron con todo lo prometido.",
        fecha: "1 month ago",
        inicial: "P",
        color: "bg-teal-500"
    },
];


/* =========================================================================
   FUNCIONES DE UTILIDAD PARA EL RENDERIZADO
   ========================================================================= */

/**
 * Genera el HTML de las estrellas (llenas y vacías).
 */
const StarRating: React.FC<{ rating: number }> = memo(({ rating }) => {
    return (
        <div className="flex text-yellow-500 text-xs">
            {[...Array(rating)].map((_, i) => (
                <span key={`filled-${i}`} className="estrella-llena">★</span>
            ))}
            {[...Array(5 - rating)].map((_, i) => (
                <span key={`empty-${i}`} className="estrella-vacia text-gray-300">★</span>
            ))}
        </div>
    );
});


/**
 * Filtra las reseñas por el umbral de 4 o 5 estrellas.
 */
const getFilteredReviews = (reviews: Review[]): Review[] => {
    return reviews.filter(review => review.puntuacion >= 4);
};

/* =========================================================================
   COMPONENTE PRINCIPAL
   ========================================================================= */

const Clients: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  
  const reseñasAMostrar = getFilteredReviews(DUMMY_REVIEWS);

  return (
    <>
      <section
        ref={sectionRef}
        id="reviews"
        role="region"
        aria-labelledby="clients-heading"
        // Fondo gris claro de la página
        className="flex justify-center py-12 px-6 bg-gray-50 min-h-[500px]"
        data-lwv="Clients"
      >
        {/* Contenedor central blanco y flotante (Máximo 5XL) */}
        <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg p-8 md:p-10">
            
            <p id="clients-heading" className="font-semibold text-2xl text-center mb-6 text-gray-800">
                What Our Customers Say
            </p>

            {/* ============== ENCABEZADO SUPERIOR DE GOOGLE ============== */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 pb-4 border-b border-gray-100">
                
                {/* Puntuación Global */}
                <div className="flex items-center mb-4 md:mb-0">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png" alt="Google Logo" className="w-6 h-6 mr-2" />
                    <div>
                        <p className="font-bold text-xl text-gray-800 leading-none">Excellent on Google</p>
                        <div className="flex items-center mt-1">
                            {/* Estrellas 5.0 */}
                            <StarRating rating={5} /> 
                            <span className="text-gray-500 text-sm ml-2 font-semibold">5.0</span>
                            <span className="text-gray-400 text-sm ml-1">({reseñasAMostrar.length}+)</span>
                        </div>
                    </div>
                </div>

                {/* Botón de Reseña */}
                <a
                    href="https://www.google.com/search?q=new+gen+patio+reviews" // Reemplaza con tu link de reseña directa
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="
                        bg-orange-500 text-white font-semibold text-base py-2 px-4 rounded 
                        transition-colors hover:bg-orange-600 shadow-md text-center
                    "
                >
                    Review us on Google
                </a>
            </div>


            {/* ==========================
                SLIDER DE RESEÑAS INDIVIDUALES (SCROLL HORIZONTAL)
                ========================== */}
            <div className="relative">
                {reseñasAMostrar.length > 0 ? (
                    <div 
                        // Utilizamos overflow-x-scroll y snap-x para el deslizamiento táctil/con mouse
                        className="
                            flex gap-6 overflow-x-scroll pb-4 
                            snap-x snap-mandatory scrollbar-hide
                            /* En escritorio, forzamos la visualización de 4 columnas */
                            lg:overflow-x-hidden lg:pb-0 
                            lg:grid lg:grid-cols-4 
                        "
                        id="reseñas-slider-contenedor"
                    >
                        {reseñasAMostrar.map((reseña, index) => (
                            <div 
                                key={index} 
                                // Estilos de la tarjeta compacta
                                className="
                                    reseña-card bg-white rounded-lg p-3 shadow-sm border border-gray-100 
                                    min-w-[280px] h-auto snap-center 
                                    lg:min-w-0 lg:h-[260px] lg:shadow-none
                                "
                            >
                                {/* Header de la tarjeta (Avatar + Info) */}
                                <div className="flex items-start mb-2">
                                    <div className={`w-8 h-8 rounded-full ${reseña.color} flex items-center justify-center text-white font-bold text-sm mr-2 flex-shrink-0`}>
                                        {reseña.inicial}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-800 leading-tight">{reseña.autor}</div>
                                        <div className="text-xs text-gray-500">{reseña.fecha}</div>
                                    </div>
                                </div>
                                
                                <StarRating rating={reseña.puntuacion} />

                                {/* Cuerpo: Texto de la Reseña */}
                                <p className="reseña-texto text-gray-700 text-sm my-2 line-clamp-3">
                                    {reseña.texto}
                                </p>
                                
                                {/* Enlace "Read more" (simulado) */}
                                <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                                    Read more
                                </a>

                                {/* Simulación de las imágenes */}
                                <div className="flex space-x-1 mt-2">
                                    <div className="w-1/3 h-12 bg-gray-100 rounded-sm"></div>
                                    <div className="w-1/3 h-12 bg-gray-100 rounded-sm"></div>
                                    <div className="w-1/3 h-12 bg-gray-100 rounded-sm"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-10">
                        Cargando reseñas o aún no hay reseñas para mostrar.
                    </div>
                )}
            </div>
            
            {/* Aquí NO incluimos el Free Google Reviews Widget ni la paginación */}

        </div>
      </section>
    </>
  );
};

export default memo(Clients);