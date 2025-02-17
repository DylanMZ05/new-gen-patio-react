import React from "react";
import Slider from "../../components/Slider/Slider";

const Attached: React.FC = () => {
    const images = [
        "assets/images/Attached24.jpg",
        "assets/images/Free3.jpg",
        "assets/images/Attached24.jpg",
        "assets/images/Free3.jpg",
        "assets/images/Attached24.jpg",
        "assets/images/Free3.jpg",
        "assets/images/Attached24.jpg",
        "assets/images/Free3.jpg",
        "assets/images/Attached24.jpg",
        "assets/images/Free3.jpg",
        "assets/images/Attached24.jpg",
        "assets/images/Free3.jpg",
        "assets/images/Attached24.jpg",
        "assets/images/Free3.jpg",
    ];
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h2 className="text-3xl font-bold mb-6">Attached Style Pergolas</h2>
            <Slider images={images} />
        </div>
    );
    };

export default Attached;
