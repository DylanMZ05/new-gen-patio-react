import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

type CardProps = {
    title: string;
    imageUrl: string;
    link: string; // 🆕 Agregamos la propiedad link
};

const Card: React.FC<CardProps> = ({ title, imageUrl, link }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ threshold: 1 });

    React.useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, y: 0 });
        } else {
            controls.start({ opacity: 0, y: 20 });
        }
    }, [controls, inView]);

    return (
        <a
            ref={ref}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-[90vw] md:w-80 h-65 rounded-lg shadow-md overflow-hidden"
        >
            <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-3 text-white/90 text-3xl font-semibold"
            >
                {title}
            </motion.div>
        </a>
    );
};

type CardGridProps = {
    cards: { title: string; imageUrl: string; link: string }[]; // 🆕 Agregamos link aquí
};

const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
    return (
        <div className="flex justify-center gap-7 flex-wrap">
            {cards.map((card, index) => (
                <Card key={index} title={card.title} imageUrl={card.imageUrl} link={card.link} />
            ))}
        </div>
    );
};

export default CardGrid;
