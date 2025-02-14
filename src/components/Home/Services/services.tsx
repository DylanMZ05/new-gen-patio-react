import CardGrid from "../../CardGrid";
import MarqueeBanner from "../../MarqueeBanner";

const cardsData = [
    { title: "Attached", imageUrl: "assets/images/Attached24.jpg" },
    { title: "Freestanding", imageUrl: "assets/images/Free3.jpg" },
    { title: "Cantilever", imageUrl: "assets/images/Attached24.jpg" },
];

const Services: React.FC = () => {
    return (
        <>
            <MarqueeBanner />
            <section className="flex flex-col items-center justify-center py-[50px] px-[25px]">
                <h3 className="">Our Services</h3>
                <h2 className="text-4xl font-semibold">Covered Patios</h2>
                <div className="w-25 h-1 background-skyblue mt-3 mb-5 rounded-4xl"></div>
                <CardGrid cards={cardsData} />
                <h2 className="text-4xl font-semibold">Additional Services</h2>
                <div className="w-25 h-1 background-skyblue mt-3 mb-5 rounded-4xl"></div>
                <CardGrid cards={cardsData} />
            </section>
        </>
    );
};

export default Services