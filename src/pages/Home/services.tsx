import CardGrid from "../../components/CardGrid";
import MarqueeBanner from "../../components/MarqueeBanner";

const coveredPatios = [
    { title: "Attached", imageUrl: "assets/images/Attached24.jpg", link: "/new-gen-patio-react/attached" },
    { title: "Freestanding", imageUrl: "assets/images/Free3.jpg", link: "/new-gen-patio-react/freestanding" },
    { title: "Cantilever", imageUrl: "assets/images/Attached24.jpg", link: "/new-gen-patio-react/cantilever" },
];

const extraServices = [
    { title: "Extra Services", imageUrl: "assets/images/Free3.jpg", link: "/new-gen-patio-react/extra-services" },
];

const Services: React.FC = () => {
    return (
        <>
            <MarqueeBanner />
            <section className="flex flex-col items-center justify-center py-[50px] px-[25px]">
                <h3 className="">Our Services</h3>
                <h2 className="text-4xl font-semibold">Covered Patios</h2>
                <div className="w-25 h-1 background-skyblue mt-3 mb-5 rounded-4xl"></div>
                <CardGrid cards={coveredPatios} />
                <h2 className="text-4xl font-semibold mt-5">Additional Services</h2>
                <div className="w-25 h-1 background-skyblue mt-3 mb-5 rounded-4xl"></div>
                <CardGrid cards={extraServices} />
            </section>
        </>
    );
};

export default Services;