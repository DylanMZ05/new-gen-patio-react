import CardGrid from "./CardGrid";

const coveredPatios = [
  { title: "Attached", imageUrl: "assets/images/Products/Patios&Pergolas/Attached/01.webp", link: "/attached" },
  { title: "Freestanding", imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/01.webp", link: "/freestanding" },
  { title: "Cantilever", imageUrl: "assets/images/Products/Patios&Pergolas/Cantilever/01.webp", link: "/cantilever" },
];

const extraServices = [
  { title: "Outdoor Kitchen", imageUrl: "assets/images/Products/OutdoorKitchen/Modern/01.webp", link: "/outdoorkitchen" },
  { title: "Concrete & Turf", imageUrl: "assets/images/Products/AdditionalServices/1.webp", link: "/concrete-turf" },
];

const Services: React.FC = () => {
  return (
    <section id="services" aria-labelledby="services-heading" className="flex flex-col items-center justify-center py-12 px-6">
      <header className="text-center max-w-2xl">
        <h3 className="text-2xl font-semibold text-[#0d4754]">OUR SERVICES</h3>
        <h2 id="services-heading" className="text-4xl font-semibold">Covered Patios</h2>
        <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto"></div>
        <p className="text-center font-semibold text-black/80 mb-6 max-w-2xl">
          At New Gen Patio, we craft premium patios, pergolas, and outdoor kitchens designed for style, durability, and functionality.
        </p>
      </header>

      <CardGrid cards={coveredPatios} />

      <div className="flex flex-col items-center gap-5 md:mt-7 md:max-w-[1016px] lg:justify-between">
        <header className="text-center">
          <h3 className="text-3xl font-semibold mt-5">Additional Services</h3>
          <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto"></div>
          <p className="text-xl font-semibold text-black/90">Outdoor Kitchen | Concrete | Turf</p>
        </header>

        <CardGrid cards={extraServices} />
      </div>
    </section>
  );
};

export default Services;
