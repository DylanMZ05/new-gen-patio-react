import { Link } from "react-router-dom";
import useScrollToTop from "../../../hooks/scrollToTop";

type WhyUsLinkProps = {
  backgroundImage: string;
};

const WhyUsLink = ({ backgroundImage }: WhyUsLinkProps) => {
  const scrollToTop = useScrollToTop(); // ✅ Corrección del uso de hook

  return (
    <section
      className="relative w-screen flex flex-col items-center justify-center bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      aria-labelledby="why-us-heading"
    >
      <div id="our-promise" className="flex flex-col w-full items-center bg-black/60 py-12 px-6 text-center">
        <header>
          <h2 id="why-us-heading" className="font-semibold text-4xl text-white">Why Us?</h2>
          <div className="w-24 h-1 bg-orange-600 mt-4 mb-3 mx-auto rounded-full"></div>
        </header>

        <p className="max-w-[1080px] text-lg text-white/80 mb-6">
          We bring your outdoor vision to life with expert craftsmanship and sustainable solutions. We provide complimentary estimates, 3D designs, and custom plans to ensure a seamless process from concept to completion. Our maintenance-free aluminum structures, backed by a 5-year warranty, offer unmatched durability and aesthetic appeal.
        </p>

        <Link
          to="/how-we-doit"
          className="text-black bg-white text-xl font-semibold px-5 py-2 rounded-full transition-all hover:bg-white/90 hover:scale-105"
          onClick={scrollToTop}
        >
          View More
        </Link>
      </div>
    </section>
  );
};

export default WhyUsLink;