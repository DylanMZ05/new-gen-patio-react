import CardGrid from "./CardGrid";

const coveredPatios: { title: string; imageUrl: string; link: string }[] = [
  {
    title: "Attached",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/01.webp",
    link: "/attached",
  },
  {
    title: "Freestanding",
    imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/01.webp",
    link: "/freestanding",
  },
  {
    title: "Cantilever",
    imageUrl: "assets/images/Products/Patios&Pergolas/Cantilever/01.webp",
    link: "/cantilever",
  },
];

const extraServices: { title: string; imageUrl: string; link: string }[] = [
  {
    title: "Outdoor Kitchen",
    imageUrl: "assets/images/Products/OutdoorKitchen/Modern/01.webp",
    link: "/extra-services",
  },
  {
    title: "Concrete & Turf",
    imageUrl: "assets/images/Products/AdditionalServices/1.webp",
    link: "/extra-services",
  },
];

const Services: React.FC = () => {
  return (
    <>
      <section
        id="services"
        className="flex flex-col items-center justify-center py-[50px] px-[25px]"
      >
        <h3 className="text-2xl font-semibold skyblue">OUR SERVICES</h3>
        <h2 className="text-4xl font-semibold">Covered Patios</h2>
        <div className="w-25 h-1 background-skyblue my-3 rounded-4xl"></div>
        <p className="text-center font-semibold text-black/80 mb-4 max-w-[800px]">At New Gen Patio, we bring your outdoor dreams to life with premium custom patios, pergolas, and outdoor kitchens. Whether you're looking for a modern entertainment space or a cozy retreat, our expert team delivers high-quality craftsmanship to ensure durability, style, and functionality.</p>
        <CardGrid cards={coveredPatios} />

        <div className="flex flex-col items-center gap-5 md:mt-7 md:max-w-[1016px] lg:justify-between">
          <div className="flex flex-col items-center ">
            <h3 className="text-3xl font-semibold mt-5">Additional Services</h3>
            <div className="w-25 h-1 background-skyblue my-3 rounded-4xl"></div>
            <p className="text-xl text-start font-semibold text-black/90">
              Outdoor Kitchen | Concrete | Turf
            </p>
          </div>
          <CardGrid cards={extraServices} />
        </div>
      </section>
    </>
  );
};

export default Services;
