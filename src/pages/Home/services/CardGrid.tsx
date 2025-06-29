import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useScrollToTop from "../../../hooks/scrollToTop";

// =====================
// TYPES
// =====================
type CardOption = {
  title: string;
  imageUrl: string;
  link: string;
};

type CardProps = {
  title: string;
  imageUrl: string;
  link?: string;
  options?: CardOption[];
  subtitle?: string; // <- NUEVO PROP
};

// =====================
// CARD COMPONENT
// =====================
const Card: React.FC<CardProps> = ({ title, imageUrl, link, options, subtitle }) => {
  const navigate = useNavigate();
  const scrollToTop = useScrollToTop();
  const [showSplitView, setShowSplitView] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMainClick = () => {
    if (options && options.length === 2) {
      setShowSplitView((prev) => !prev);
    } else if (link) {
      navigate(link);
      scrollToTop();
    }
  };

  const handleOptionClick = (link: string) => {
    navigate(link);
    scrollToTop();
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setShowSplitView(false);
      }
    };

    if (showSplitView) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSplitView]);

  return (
    <article
      ref={cardRef}
      onClick={handleMainClick}
      className="card-container relative w-[90vw] md:w-80 rounded-lg shadow-md overflow-hidden cursor-pointer"
      aria-label={`Go to ${title} service`}
    >
      {/* Imagen principal */}
      <figure className="w-full h-64 overflow-hidden rounded-lg relative">
        <img
          src={imageUrl}
          alt={`New Gen Patio service: ${title}`}
          loading="lazy"
          width={640}
          height={256} // h-64 ≈ 256px
          decoding="async"
          onError={(e) => (e.currentTarget.src = "/assets/images/default-placeholder.webp")}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <motion.figcaption
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-3 text-white"
        >
          <h3 className="text-white text-2xl font-semibold">{title}</h3>
          {subtitle && (
            <p className="text-sm text-white/80 leading-tight mt-1">
              {subtitle}
            </p>
          )}
        </motion.figcaption>
      </figure>

      {/* Vista dividida si hay opciones */}
      <AnimatePresence>
        {showSplitView && options && options.length === 2 && (
          <motion.div
            key="splitView"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 grid grid-rows-2 z-30"
          >
            {options.map((opt, i) => (
              <div
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionClick(opt.link);
                }}
                className="relative group overflow-hidden"
              >
                <img
                  src={opt.imageUrl}
                  alt={`Service option: ${opt.title}`}
                  loading="lazy"
                  width={640}
                  height={256}
                  decoding="async"
                  onError={(e) => (e.currentTarget.src = "/assets/images/default-placeholder.webp")}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <p className="text-white text-2xl font-bold text-center px-2">
                    {opt.title}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

// =====================
// CARD GRID COMPONENT
// =====================
type CardGridProps = {
  cards: CardProps[];
};

const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  return (
    <div className="flex justify-center gap-7 flex-wrap">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default CardGrid;
