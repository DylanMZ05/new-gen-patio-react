import { Link } from "react-router-dom";
import FAQItem from "./FAQItem";
import FreeQuoteButton from "../../../components/FreeQuoteButton";
import useScrollToTop from "../../../hooks/scrollToTop";

const FAQ: React.FC = () => {
  const scrollToTop = useScrollToTop();

  const faqData = [
    {
      question: "How do your pergolas differ from wooden pergolas?",
      answer:
        "Our aluminum pergolas are more durable, weather-resistant, and maintenance-free. They don't warp, crack, or rot and require no staining or sealing.",
    },
    {
      question: "How can I request a free quote?",
      answer:
        "Call 346-581-9082 or click the 'Free Quote' button on our website. It's quick and easy!",
    },
    {
      question: "What is the process from start to finish?",
      answer: (
        <>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Request a free quote online or call us.</li>
            <li>Schedule a free in-home consultation.</li>
            <li>Receive a formal quote with 3D renderings.</li>
            <li>Sign the approved proposal and submit a 25% deposit.</li>
            <li>Schedule the construction start date.</li>
            <li>Get regular updates before construction.</li>
            <li>Construction begins with our quality assurance.</li>
            <li>Final walk-through and review.</li>
          </ol>
          <p className="mt-3">
            Want to learn more?{" "}
            <Link
              to="/howwedoit_patiobuildershouston"
              onClick={scrollToTop}
              className="text-orange-600 font-semibold hover:underline"
            >
              Click here to see our full process.
            </Link>
          </p>
        </>
      ),
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept ACH transfers, checks, wire transfers, and credit cards. Flexible payment options available.",
    },
    {
      question: "What materials do you use for the roofing?",
      answer:
        "We use high-quality insulated aluminum roofing panels with a 3-inch core of compressed styrofoam. We also offer polycarbonate and methacrylate options for natural light filtering.",
    },
    {
      question: "Do you offer financing options?",
      answer:
        "Yes! We partner with Hearth Financing and VistaFi to offer up to 18 months of 0% interest financing.",
    },
    {
      question: "Where do you offer your services?",
      answer:
        "We are based in Spring, Texas, and serve clients across the entire state, focusing on the Houston area.",
    },
  ];

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="flex flex-col items-center justify-center py-12 px-6 border-t border-black/20 overflow-hidden"
    >
      <header className="text-center">
        <p
          id="faq-heading"
          className="font-semibold text-2xl text-[#0d4754]"
        >
          FAQs
        </p>
        <h2 className="font-semibold text-4xl text-center">
          Frequently Asked Questions
        </h2>
        <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-5 rounded-full mx-auto"></div>
      </header>

      <div className="w-full max-w-2xl">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      <p className="mt-5 font-normal text-xl text-center">
        Have another question?
        <br />
        No problem,{" "}
        <a
          href="https://wa.me/13463800845"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 font-semibold hover:underline"
        >
          contact us
        </a>
        .
      </p>

      <FreeQuoteButton />
    </section>
  );
};

export default FAQ;
