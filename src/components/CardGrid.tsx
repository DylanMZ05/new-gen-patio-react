import React from "react";

type CardProps = {
    title: string;
    imageUrl: string;
};

const Card: React.FC<CardProps> = ({ title, imageUrl }) => {
    return (
        <div className="flex flex-col items-center">
            <div
                className="w-[90vw] h-65 md:w-80 md:h-65 rounded-lg shadow-md bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
            <p className="mt-2 text-lg font-semibold">{title}</p>
        </div>
    );
};

type CardGridProps = {
    cards: { title: string; imageUrl: string }[];
};

const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
    return (
        <div className="flex justify-center gap-7 flex-wrap">
            {cards.map((card, index) => (
                <Card key={index} title={card.title} imageUrl={card.imageUrl} />
            ))}
        </div>
    );
};

export default CardGrid;
