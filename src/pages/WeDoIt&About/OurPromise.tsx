import React from "react";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";

const sectionsData = [
  {
    id: 1,
    title: "What is the process from start to finish?",
    description: "From concept to completion, we follow a streamlined process to ensure a smooth and hassle-free experience.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/12.webp",
  },
];

const HowWeDoIt: React.FC = () => {
  return (
    <section className="min-h-screen w-full flex flex-col items-center bg-gray-100">
      <SectionBlock sections={sectionsData} />
      <MarqueeBanner />

      <div className="flex flex-col items-center my-10 gap-10">
        <div className="text-center flex flex-col items-center">
          <h3 className="font-semibold text-3xl px-5 max-w-200"> From the first consultation to project completion, we guarantee a clear, professional, and hassle-free process.</h3>
          <div className="w-30 h-1 background-skyblue mx-auto rounded-full mt-5"></div>
          <p className="p-5 max-w-[1080px]">With us, your satisfaction is always at the heart of what we do. Every project is approached with care, attention to detail, and a commitment to excellence. High-quality materials and innovative techniques are used to ensure durability, aesthetics, and functionality in every design. Transparency and open communication are prioritized, so you always feel confident in every step of the process. More than just outdoor structures, inviting and comfortable spaces are created—designed to be enjoyed for years to come.</p>
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
