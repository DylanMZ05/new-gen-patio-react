import React from "react";

type ImageTextSectionProps = {
    title: string;
    text: string;
    imageUrl: string;
    imagePosition?: "left" | "right";
};

const ImageTextSection: React.FC<ImageTextSectionProps> = ({ title, text, imageUrl, imagePosition = "right" }) => {
    return (
        <section className={`flex flex-col ${imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row"} max-w-[1000px] items-start gap-5`}>
            <div className="flex flex-col items-center text-center mx-auto md:mx-0 md:text-start md:items-start md:w-1/2 md:mt-3 px-5">
                <h3 className="text-3xl font-bold">
                    {title}
                </h3>
                <div className="w-24 h-[3px] background-skyblue my-3 rounded-full"></div>
                <p className="text-xl text-gray-700">
                    {text}
                </p>
            </div>
            <div className="md:w-1/2 px-5">
                <img src={imageUrl} alt={title} className="rounded-lg shadow-md w-full h-auto" />
            </div>
        </section>
    );
};

export default ImageTextSection;