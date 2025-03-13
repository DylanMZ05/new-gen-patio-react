import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";

const HowWeDoItHome: React.FC = () => {
  const handleScrollToTop = useScrollToTop();

  return (
    <section
      id="how-we-do-it"
      aria-labelledby="how-we-do-it-heading"
      className="relative flex flex-col items-center justify-center py-12 px-6 text-center bg-gray-100"
    >
      <header>
        <h3 className="text-2xl font-semibold text-[#0d4754] tracking-wide uppercase">
          Quality & Durability
        </h3>
        <h1 id="how-we-do-it-heading" className="text-4xl font-semibold text-black mt-2">
          How We Do It
        </h1>
        <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto"></div>
      </header>

      <p className="text-lg font-medium text-black/90 max-w-2xl">
        From concept to completion, we craft premium outdoor spaces that blend elegance and functionality. 
        Our process ensures durability, style, and efficiency, delivering a hassle-free experience from start to finish.
      </p>

      <Link
        to="/howwedoit"
        className="bg-orange-500 text-white text-lg font-semibold px-6 py-2 rounded-full mt-6 inline-block 
          transition-all hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        onClick={handleScrollToTop}
        aria-label="Learn more about how we build high-quality patios and pergolas"
        rel="prefetch"
      >
        How We Do It
      </Link>
    </section>
  );
};

export default HowWeDoItHome;