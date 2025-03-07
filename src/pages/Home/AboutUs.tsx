import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";

const AboutUs: React.FC = () => {
  const handleScrollToTop = useScrollToTop();

  return (
    <section
      id="who-we-are"
      aria-labelledby="about-heading"
      className="relative flex flex-col items-center justify-center py-12 px-6 text-white text-center overflow-hidden"
    >
      <div>
        <h3 className="text-2xl font-semibold text-[#0d4754]">CRAFTED FOR LIFE</h3>
        <h2 id="services-heading" className="text-4xl font-semibold text-black">About Us</h2>
        <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto"></div>
        <p className="text-center font-semibold text-lg text-black/90 max-w-2xl">
          We bring you outdoor dreams to life with premium custom patios, pergolas, and outdoor kitchens. Whether you're looking for a moder entertainment space or a cozy retrear, our expert team delivers high-quality craftsmanship to ensure durability, style, and functionality.
        </p>
        <Link
          to="/aboutus"
          className="bg-orange-500 text-white text-lg font-semibold px-5 py-2 rounded-full mt-5 inline-block 
            transition-all hover:bg-orange-600 hover:scale-102"
          onClick={handleScrollToTop}
        >
          Discover Our Story
        </Link>
      </div>
    </section>
  );
};

export default AboutUs;
