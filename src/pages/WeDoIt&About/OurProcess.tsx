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

const OurProcess: React.FC = () => {
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
          imageProps={{ alt: "Requesting a free online quote for an aluminum patio", loading: "lazy" }}
        />

        <ImgTxtSection
          stepLabel="Step 2:"
          title="Schedule a free in-home consultation."
          text="We visit your property to assess the available space and discuss your ideas. This step is crucial to understanding your needs and ensuring the design perfectly fits your space and style."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/06.webp"
          imagePosition="left"
          imageProps={{ alt: "Consultation for outdoor patio design", loading: "lazy" }}
        />

        <ImgTxtSection
          stepLabel="Step 3:"
          title="Receive a formal quote with 3D renderings and project scope."
          text="We present a detailed proposal, including 3D images so you can visualize the final result. It also outlines materials, project timelines, and transparent pricing."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/12.webp"
          imagePosition="right"
          imageProps={{ alt: "3D rendering of an aluminum pergola project", loading: "lazy" }}
        />

        <ImgTxtSection
          stepLabel="Step 4:"
          title="Sign the approved proposal and submit a 25% deposit."
          text="Signing the approved proposal ensures that every detail is clearly defined and aligned with your expectations. The initial deposit allows us to begin planning and securing materials."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/20.webp"
          imagePosition="left"
          imageProps={{ alt: "Signing a contract for patio construction", loading: "lazy" }}
        />

        <ImgTxtSection
          stepLabel="Step 5:"
          title="Schedule the construction start date."
          text="We coordinate an efficient work schedule to minimize disruptions and ensure the project stays on track."
          imageUrl="assets/images/Products/Patios&Pergolas/Cantilever/03.webp"
          imagePosition="right"
          imageProps={{ alt: "Scheduling construction for a patio project", loading: "lazy" }}
        />

        <ImgTxtSection
          stepLabel="Step 6:"
          title="Get regular updates before construction."
          text="We keep in touch to provide updates on project progress, answer any questions, and ensure everything is ready for construction."
          imageUrl="assets/images/Products/Patios&Pergolas/Freestanding/05.webp"
          imagePosition="left"
          imageProps={{ alt: "Customer receiving project updates before construction", loading: "lazy" }}
        />

        <ImgTxtSection
          stepLabel="Step 7:"
          title="Construction begins! Our team ensures quality at every step."
          text="Our experts execute the project with precision and attention to detail, ensuring that every material and technique meets the highest quality standards."
          imageUrl="assets/images/Products/Patios&Pergolas/Freestanding/06.webp"
          imagePosition="right"
          imageProps={{ alt: "Team working on patio construction", loading: "lazy" }}
        />

        <ImgTxtSection
          stepLabel="Step 8:"
          title="Final walk-through and review."
          text="We conduct a detailed inspection with you to ensure everything is flawless. We make sure you are 100% satisfied before final delivery."
          imageUrl="assets/images/Products/Patios&Pergolas/Freestanding/24.webp"
          imagePosition="left"
          imageProps={{ alt: "Final review of an aluminum pergola installation", loading: "lazy" }}
        />
      </div>
    </section>
  );
};

export default OurProcess;