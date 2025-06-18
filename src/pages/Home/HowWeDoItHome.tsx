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
        <h2 id="how-we-do-it-heading" className="text-2xl font-semibold text-[#0d4754] tracking-wide uppercase">
          How We Do It
        </h2>
        <p className="text-4xl font-semibold text-black mt-2">
          From idea to reality
        </p>
        <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto"></div>
      </header>

      <h3 className="text-lg font-medium text-black/90 max-w-2xl">
        From concept to completion, we craft premium outdoor spaces that blend elegance and functionality. 
        Our process ensures durability, style, and efficiency, delivering a hassle-free experience from start to finish.
      </h3>

      <Link
        to="/how-we-doit"
        className="bg-orange-500 border border-white/10 text-white text-lg font-semibold px-6 py-2 rounded-full mt-6 inline-block 
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