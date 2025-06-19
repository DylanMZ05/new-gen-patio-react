import { Link } from "react-router-dom";
import "../styles/marquee.css";

const MarqueeBanner = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <Link
      to="/patio-financing-houston"
      className="marquee-container w-full block bg-[#0d4754] py-3 overflow-hidden relative"
      onClick={handleScrollToTop}
      aria-label="Go to financing calculator - Up to 18 months at 0% interest"
      data-discover="true"
    >
      <div className="marquee w-max flex items-center gap-3">
        <p className="text-white text-lg font-bold">
          Flexible Financing Available - Up to 18 Months at 0% Interest!
        </p>
        <span className="bg-white px-3 py-1 rounded-4xl font-semibold text-black">
          Apply Now!
        </span>
      </div>
    </Link>
  );
};

export default MarqueeBanner;
