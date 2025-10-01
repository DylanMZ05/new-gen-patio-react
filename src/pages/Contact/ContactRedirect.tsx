import { Link } from "react-router-dom";
import { FiFileText, FiMessageCircle, FiDollarSign } from "react-icons/fi";
import BlockSection from "../../components/BlockSection";
import MarqueeBanner from "../../components/MarqueeBanner";

const ContactRedirect = () => {
  const cards = [
    {
      icon: <FiFileText className="text-[#0d4754] w-12 h-12 mx-auto mb-2" />,
      text: "Want to personalize your project? Fill out this custom form and get a free online estimate.",
      button: "Free Quote",
      to: "/get-a-free-quote-houston",
      external: false,
    },
    {
      icon: <FiMessageCircle className="text-[#0d4754] w-12 h-12 mx-auto mb-2" />,
      text: "Want to speak directly with the team? Click here.",
      button: "Contact Us",
      to: "https://wa.me/3465819082",
      external: true,
    },
    {
      icon: <FiDollarSign className="text-[#0d4754] w-12 h-12 mx-auto mb-2" />,
      text: "Want to estimate your financing options? Click here to see how it works.",
      button: "Get Financing",
      to: "/patio-financing-houston",
      external: false,
    },
  ];

  return (
    <>
      <div
        role="region"
        aria-label="Contact options"
        className="bg-[url('/assets/images/Products/Patios&Pergolas/Attached/20.webp')] bg-cover bg-center"
      >
        <BlockSection />
        <main className="bg-black/60 w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-10">
          <h1 className="text-white/90 text-3xl md:text-4xl font-bold text-center mb-2 max-w-3xl leading-tight">
            Contact New Gen Patio – Request a FREE Consultation Today
          </h1>
          <div
                    className="bg-orange-500 border border-white/10 h-1 w-50 rounded-full mx-auto mb-4"
                    aria-hidden="true"
          />

          <section className="grid grid-cols-1 gap-6 w-full max-w-md md:max-w-6xl md:grid-cols-3">
            {cards.map((item, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl shadow-md text-center p-6 flex flex-col justify-between h-full"
              >
                <div>
                  {item.icon}
                  <div
                    className="bg-orange-600 h-1 w-5 rounded-full mx-auto mb-4"
                    aria-hidden="true"
                  />
                  <p className="text-gray-700 font-medium text-base leading-relaxed">
                    {item.text}
                  </p>
                </div>

                {item.external ? (
                  <a
                    href={item.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 mx-auto w-fit bg-[#0d4754] text-white font-semibold text-sm px-6 py-2 rounded-full hover:bg-[#0d3254] transition-colors focus:outline-2 focus:outline-orange-500"
                  >
                    {item.button}
                  </a>
                ) : (
                  <Link
                    to={item.to}
                    className="mt-6 mx-auto w-fit bg-[#0d4754] text-white font-semibold text-sm px-6 py-2 rounded-full hover:bg-[#0d3254] transition-colors focus:outline-2 focus:outline-orange-500"
                  >
                    {item.button}
                  </Link>
                )}
              </article>
            ))}
          </section>
        </main>
      </div>

      <MarqueeBanner />
    </>
  );
};

export default ContactRedirect;