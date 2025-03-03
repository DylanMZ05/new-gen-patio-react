import FAQItem from "./FAQItem";

const faqData = [
  {
    question: "How do your pergolas differ from wooden pergolas?",
    answer:
      "Our aluminum pergolas are more durable, weather-resistant, and maintenance-free compared to wooden pergolas. They don’t warp, crack, or rot over time and require no staining or sealing. They also offer better fire resistance and energy efficiency, keeping outdoor spaces cooler by reflecting heat.",
  },
  {
    "question": "How can I request a free quote?",
    "answer": "You can request a completely free quote by calling 346-581-9082 or clicking the \"Free Quote\" button on our website. It's quick and easy!"
  },
  {
    question: "What is the process from start to finish?",
    answer:
      "Step 1: Request a free online quote or call us for a rough estimate. \nStep 2: Schedule a free in-home consultation.\nStep 3: Receive a formal quote with 3D renderings and project scope.\nStep 4: Sign the contract and submit a 25% deposit.\nStep 5: Schedule the construction start date.\nStep 6: Get regular updates before construction.\nStep 7: Construction begins! Our team ensures quality at every step.\nStep 8: Final walk-through and review.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept ACH transfers, checks, wire transfers, and credit cards. Flexible payment options available.",
  },
  {
    question: "What materials do you use for the roofing?",
    answer:
      "We use high-quality insulated aluminum roofing panels with a 3-inch core of compressed styrofoam. These provide thermal insulation to keep your space cooler. We also offer polycarbonate and methacrylate options for natural light filtering.",
  },
  {
    question: "Do you offer financing options?",
    answer:
      "Yes! We partner with Hearth Financing and VistaFi to offer up to 18 months of 0% interest financing. Visit our Financing Page for more details.",
  },
  {
    question: "Where do you offer your services?",
    answer:
      "We are based in Spring, Texas, and serve clients across the entire state, with a primary focus on the Houston area.",
  },
];

const FAQ: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center py-12 px-6 border-t border-black/20 overflow-hidden">
      <h2 className="font-semibold text-2xl text-center skyblue">FAQ</h2>
      <h3 className="font-semibold text-4xl text-center">
        Frequented Asked
      </h3>
      <div className="w-24 h-1 background-skyblue mt-4 mb-5 rounded-full"></div>

      <div className="w-full max-w-2xl">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      <p className="mt-5 font-normal text-xl">
        Have another question?
        <br />
        No problem,{" "}
        <a
          href={`https://wa.me/13463800845`}
          target="_blank"
          className="text-orange-500 font-semibold"
        >
          contact us
        </a>
        .
      </p>
    </section>
  );
};

export default FAQ;
