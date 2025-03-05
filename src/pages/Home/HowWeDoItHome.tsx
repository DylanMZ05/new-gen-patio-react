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
          Our Commitment to Quality & Sustainability
        </h2>
        <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-3 rounded-full mx-auto"></div>
      </header>

      <article className="max-w-2xl text-lg leading-relaxed text-center opacity-90">
        <p>
          At New Gen Patio, we bring your outdoor vision to life with expert craftsmanship and 
          sustainable solutions. Our process includes complimentary estimates, 3D designs, and 
          custom plans to ensure a seamless experience from concept to completion.
        </p>

        <p className="mt-4">
          Our maintenance-free aluminum structures, backed by a 5-year warranty, offer unmatched 
          durability and aesthetic appeal. Committed to sustainability, we use 100% recyclable 
          materials, minimizing environmental impact while enhancing your outdoor space.
        </p>

        <p className="mt-4">
          Our experienced team handles permits and maintains clear communication throughout the project, 
          ensuring a stress-free experience. Your satisfaction is our priority, and we won't rest until 
          your dream outdoor space is a reality.
        </p>
      </article>

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