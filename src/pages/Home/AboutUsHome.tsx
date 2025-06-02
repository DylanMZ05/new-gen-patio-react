import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";

const AboutUsHome: React.FC = () => {
  const handleScrollToTop = useScrollToTop();

  return (
    <section
      id="about-us"
      aria-labelledby="about-us-heading"
      className="relative flex flex-col items-center justify-center py-12 px-6 text-center bg-gray-100"
    >
      <header>
        <h2 id="about-us-heading" className="text-2xl font-semibold text-[#0d4754] tracking-wide uppercase">
          About Us
        </h2>
        <p className="text-4xl font-semibold text-black mt-2">
          Passionate About Outdoors
        </p>
        <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto"></div>
      </header>

      <p className="text-lg font-medium text-black/90 max-w-2xl">
        We’re more than builders — we’re a team dedicated to designing outdoor spaces that inspire connection, comfort, and lasting memories.
      </p>

      <Link
        to="/about-us"
        className="bg-orange-500 border border-white/10 text-white text-lg font-semibold px-6 py-2 rounded-full mt-6 inline-block 
          transition-all hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        onClick={handleScrollToTop}
        aria-label="Learn more about our team and mission"
        rel="prefetch"
      >
        Learn More About Us
      </Link>
    </section>
  );
};

export default AboutUsHome;
