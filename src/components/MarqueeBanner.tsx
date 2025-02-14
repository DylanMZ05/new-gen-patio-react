import "../styles/marquee.css";

const MarqueeBanner = () => {
    return (
        <div className="w-full overflow-hidden background-skyblue py-3">
            <div className="flex flex-wrap marquee">
                <p className="text-white text-lg font-bold mr-10">
                    Flexible Financing Available - Up to 18 Months at 0% Interest!
                </p>
                <a href="" className="bg-white px-3 py-1 rounded-4xl font-semibold">
                    Aplly Now!
                </a>
            </div>
        </div>
    );
};

export default MarqueeBanner;