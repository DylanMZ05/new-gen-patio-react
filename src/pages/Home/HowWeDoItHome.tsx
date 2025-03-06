import { Link } from "react-router-dom";

const HowWeDoItHome: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <section
      id="our-promise"
      aria-labelledby="commitment-heading"
      className="flex flex-col items-center justify-center py-12 px-6 border-t border-black/20"
    >
      <header className="text-center max-w-2xl">
        <h2 id="commitment-heading" className="font-semibold text-4xl">
          Quality & Sustainability Commitment
        </h2>
        <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-3 rounded-full mx-auto"></div>
      </header>

      <p className="max-w-2xl text-lg leading-relaxed text-center opacity-90">
        We design maintenance-free aluminum structures backed by a 5-year warranty. Our 100% recyclable materials ensure durability while reducing environmental impact. From custom 3D designs to seamless permit handling, we make your outdoor vision a reality.
      </p>

      <Link
        to="/howwedoit"
        className="text-white bg-black text-lg font-semibold px-6 py-2 rounded-full mt-6 transition-all 
          hover:bg-black/90 hover:scale-105 focus:ring-2 focus:ring-white focus:outline-none"
        onClick={handleScrollToTop}
      >
        Learn More
      </Link>
    </section>
  );
};

export default HowWeDoItHome;
