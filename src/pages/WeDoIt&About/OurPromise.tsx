import React from "react";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";

const sectionsData = [
  {
    id: 1,
    title: "What is the process from start to finish?",
    description: "From concept to completion, we follow a streamlined process to ensure a smooth and hassle-free experience.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/23.webp",
  },
];

const OurPromise: React.FC = () => {
  return (
    <section
      className="min-h-screen w-full flex flex-col items-center bg-gray-100"
      lang="en"
      aria-labelledby="process-heading"
    >
      <header className="sr-only">
        <h1 id="process-heading">How we do it – How We Do It</h1>
      </header>

      <SectionBlock sections={sectionsData} />
      <MarqueeBanner />

      <div className="flex flex-col items-center my-10 gap-10 max-w-screen-lg px-5">
        <header className="text-center">
          <h2 className="font-semibold text-3xl max-w-2xl">
            From the first consultation to project completion, we guarantee a clear, professional, and hassle-free process.
          </h2>
          <div className="w-24 h-1 bg-[#0d4754] mx-auto rounded-full mt-5"></div>
          <p className="mt-4 text-lg leading-relaxed">
            Your satisfaction is at the heart of what we do. We use **high-quality materials** and **innovative techniques** to ensure durability and aesthetics. 
            How we do it is transparent, ensuring you feel confident every step of the way.
          </p>
        </header>

        <article aria-labelledby="visualizing-heading">
          <ImgTxtSection
            title="Visualizing Your Project"
            text="We provide 100% free estimates, along with 3D designs and detailed plans before starting your project."
            imageUrl="assets/images/OurPromise/01.webp"
            imagePosition="left"
            imageProps={{ alt: "3D rendering of an aluminum pergola project", loading: "lazy" }}
          />
        </article>

        <article aria-labelledby="built-to-last-heading">
          <ImgTxtSection
            title="Built to Last with $0 Maintenance"
            text="Our aluminum structures are designed to endure harsh weather conditions without rusting, fading, or requiring repainting."
            imageUrl="assets/images/OurPromise/02.webp"
            imagePosition="right"
            imageProps={{ alt: "Aluminum pergola with weather-resistant materials", loading: "lazy" }}
          />
        </article>

        <article aria-labelledby="permits-heading">
          <ImgTxtSection
            title="HOA & City Permits Made Easy"
            text="We handle all the paperwork to ensure smooth approvals from your HOA and city permits."
            imageUrl="assets/images/OurPromise/03.webp"
            imagePosition="left"
            imageProps={{ alt: "Official permits and documents for outdoor patio construction", loading: "lazy" }}
          />
        </article>

        <article aria-labelledby="sustainability-heading">
          <ImgTxtSection
            title="Sustainability That Matters"
            text="We use 100% recyclable aluminum for our pergolas and patios, reducing environmental impact while ensuring durability."
            imageUrl="assets/images/OurPromise/04.webp"
            imagePosition="right"
            imageProps={{ alt: "Sustainable aluminum materials for eco-friendly pergolas", loading: "lazy" }}
          />
        </article>

        <article aria-labelledby="warranty-heading">
          <ImgTxtSection
            title="5-Year Warranty for Peace of Mind"
            text="Every project is backed by our comprehensive 5-year warranty for long-lasting durability."
            imageUrl="assets/images/OurPromise/05.webp"
            imagePosition="left"
            imageProps={{ alt: "Warranty document with 5-year guarantee for patio structures", loading: "lazy" }}
          />
        </article>

        <article aria-labelledby="customers-heading">
          <ImgTxtSection
            title="Our Customers Come First"
            text="With 5-star Google reviews and a 100% satisfaction guarantee, we value transparency, clear communication, and quality service."
            imageUrl="assets/images/OurPromise/06.webp"
            imagePosition="right"
            imageProps={{ alt: "Happy customers enjoying their outdoor patio", loading: "lazy" }}
          />
        </article>
      </div>
    </section>
  );
};

export default OurPromise;