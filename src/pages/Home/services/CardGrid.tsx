import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useScrollToTop from "../../../hooks/scrollToTop";

type CardProps = {
  title: string;
  imageUrl: string;
  link: string;
};

const Card: React.FC<CardProps> = ({ title, imageUrl, link }) => {
  const navigate = useNavigate();
  const scrollToTop = useScrollToTop();

  const handleClick = () => {
    navigate(link);
    scrollToTop();
  };

  return (
    <article
      onClick={handleClick}
      className="relative w-[90vw] md:w-80 h-65 rounded-lg shadow-md overflow-hidden cursor-pointer"
      aria-label={`Go to ${title} service`}
    >
      <figure className="w-full h-full">
        <img
          src={imageUrl}
          alt={`${title} service`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <motion.figcaption
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-3 text-white text-2xl font-semibold"
        >
          {title}
        </motion.figcaption>
      </figure>
    </article>
  );
};

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
