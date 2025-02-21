import { Link } from "react-router-dom";
import "../styles/marquee.css";

const MarqueeBanner = () => {
  return (
    <Link
      to="/calculator"
      className="marquee-container background-skyblue w-full block"
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
