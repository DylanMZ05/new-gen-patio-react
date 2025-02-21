import CardGrid from "./CardGrid";
import MarqueeBanner from "../../../components/MarqueeBanner";

const coveredPatios: { title: string; imageUrl: string; link: string }[] = [
    { title: "Attached", imageUrl: "assets/images/Attached24.jpg", link: "/attached" },
    { title: "Freestanding", imageUrl: "assets/images/Free3.jpg", link: "/freestanding" },
    { title: "Cantilever", imageUrl: "assets/images/Attached24.jpg", link: "/cantilever" },
];

const extraServices: { title: string; imageUrl: string; link: string }[] = [
    { title: "Outdoor Kitchen", imageUrl: "assets/images/Free3.jpg", link: "/extra-services" },
    { title: "Concrete & Grass", imageUrl: "assets/images/Free3.jpg", link: "/extra-services" },
];

const Services: React.FC = () => {
    return (
        <>
            <MarqueeBanner />
            <section id="services" className="flex flex-col items-center justify-center py-[50px] px-[25px]">
                <h3 className="text-2xl font-semibold skyblue">OUR SERVICES</h3>
                <h2 className="text-4xl font-semibold">Covered Patios</h2>
                <div className="w-25 h-1 background-skyblue mt-3 mb-5 rounded-4xl"></div>
                <CardGrid cards={coveredPatios} />

                <div className="flex flex-col items-center lg:flex-row gap-5 md:mt-7 md:w-screen md:max-w-[1016px] lg:justify-between">
                    <div className="flex flex-col items-center md:items-start md:bg-neutral-100 md:w-[320px] md:h-[260px] md:rounded-xl p-2 md:shadow-md md:border-1 md:border-black/10">
                        <h3 className="text-3xl font-semibold mt-5">Additional Services</h3>
                        <div className="w-25 h-1 background-skyblue my-3 rounded-4xl"></div>
                        <p className="text-xl text-start font-semibold text-black/90 md:hidden">
                            Outdoor Kitchen | Concrete | Grass
                        </p>
                        <p className="hidden text-xl mb-2 text-start font-semibold text-black/90 md:block">
                            - Outdoor Kitchen
                            <span className="block"></span>
                            - Concrete
                            <span className="block"></span>
                            - Grass
                        </p>
                    </div>
                    <CardGrid cards={extraServices} />
                </div>
            </section>
        </>
    );
};

export default Services;
