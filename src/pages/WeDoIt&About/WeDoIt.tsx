import React from "react";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";

const sectionsData = [
  {
    id: 1,
    title: "What is the process from start to finish?",
    description: "From concept to completion, we follow a streamlined process to ensure a smooth and hassle-free experience.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/04.webp",
  },
];

const HowWeDoIt: React.FC = () => {
  return (
    <section className="min-h-screen w-full flex flex-col items-center bg-gray-100">
      <SectionBlock sections={sectionsData} />
      <MarqueeBanner />

      <div className="flex flex-col items-center my-10 gap-10">
        <ImgTxtSection
          stepLabel="Step 1:"
          title="Request a free online quote or call us for a rough estimate."
          text="We make the first contact easy, providing you with an initial cost estimate with no commitment. Just send us basic details about your space and the type of project you have in mind."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/04.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          stepLabel="Step 2:"
          title="Schedule a free in home consultation."
          text="We visit your property to assess the available space and discuss your ideas. This step is crucial to understanding your needs and ensuring the design perfectly fits your space and style."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/06.webp"
          imagePosition="left"
        />

        <ImgTxtSection
          stepLabel="Step 3:"
          title="Receive a formal quote with 3D renderings and project scope."
          text="We present a detailed proposal, including 3D images so you can visualize the final result. It also outlines materials, project timelines, and transparent pricing."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/12.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          stepLabel="Step 4:"
          title="Sign the contract and submit a 25% deposit."
          text="Signing the contract ensures that every detail is clearly defined and aligned with your expectations. The initial deposit allows us to begin planning and securing materials."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/20.webp"
          imagePosition="left"
        />

        <ImgTxtSection
          stepLabel="Step 5:"
          title="Schedule the construction start date."
          text="We coordinate an efficient work schedule to minimize disruptions and ensure the project stays on track."
          imageUrl="assets/images/Products/Patios&Pergolas/Cantilever/03.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          stepLabel="Step 6:"
          title="Get regular updates before construction."
          text="We keep in touch to provide updates on project progress, answer any questions, and ensure everything is ready for construction."
          imageUrl="assets/images/Products/Patios&Pergolas/Freestanding/05.webp"
          imagePosition="left"
        />

        <ImgTxtSection
          stepLabel="Step 7:"
          title="Construction begins! Our team ensures quality at every step."
          text="Our experts execute the project with precision and attention to detail, ensuring that every material and technique meets the highest quality standards."
          imageUrl="assets/images/Products/Patios&Pergolas/Freestanding/06.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          stepLabel="Step 8:"
          title="Final walk-through and review."
          text="We conduct a detailed inspection with you to ensure everything is flawless. We make sure you are 100% satisfied before final delivery."
          imageUrl="assets/images/Products/Patios&Pergolas/Freestanding/24.webp"
          imagePosition="left"
        />
        <hr className="text-black/20"/>

        <div>
          <h3 className="text-center font-semibold text-3xl px-5 max-w-200"> From the first consultation to project completion, we guarantee a clear, professional, and hassle-free process.</h3>
          <div className="w-30 h-1 background-skyblue mx-auto rounded-full mt-5"></div>
        </div>
        
        <ImgTxtSection
          title="Visualizing Your Project"
          text="Making your vision crystal clear before we even start is essential for us. That’s why we provide 100% free complimentary estimates, along with 3D designs and detailed plans."
          imageUrl="assets/images/OurPromise/01.webp"
          imagePosition="left"
        />

        <ImgTxtSection
          title="Built to Last with $0 cost of Maintenance"
          text="Our aluminum structures are designed to endure the harshest conditions without needing any upkeep. Unlike wood or steel, our maintenance-free aluminum won’t rust, fade, or need repainting."
          imageUrl="assets/images/OurPromise/02.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="HOA & City Permits"
          text="We ensure your outdoor space remains exceptional long after installation. With top-quality craftsmanship, every project is backed by our comprehensive 5-year warranty for lasting durability and peace of mind."
          imageUrl="assets/images/OurPromise/03.webp"
          imagePosition="left"
        />

        <ImgTxtSection
          title="Sustainability That Matters"
          text="We use 100% recyclable aluminum for our pergolas and patios, ensuring durability while reducing environmental impact. By choosing our materials, you invest in a long-lasting structure and a more sustainable future."
          imageUrl="assets/images/OurPromise/04.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="5-Year Warranty for Your Peace of Mind"
          text="We support you through every step, providing all necessary documentation for HOA or City Permit approval. From paperwork to final approvals, we make the process smooth and hassle-free."
          imageUrl="assets/images/OurPromise/05.webp"
          imagePosition="left"
        />

        <ImgTxtSection
          title="Our Customers Come First"
          text="We value honesty, transparency, and clear communication. With 5-star reviews on Google and a 100% satisfaction guarantee, your happiness is our priority."
          imageUrl="assets/images/OurPromise/06.webp"
          imagePosition="right"
        />
      </div>
    </section>
  );
};

export default HowWeDoIt;
