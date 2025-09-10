import React from "react";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";
import FreeQuoteButton from "../../components/FreeQuoteButton";
import ImageSlider from "../../components/ImageSlider";
import { Helmet } from "react-helmet-async";

const sectionsData = [
  {
    id: 1,
    title: "How We Build – Expert Patio Construction in Houston",
    description:
      "From concept to completion, we follow a streamlined process to ensure a smooth and hassle-free experience.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/12.webp",
  },
];

const OurProcess: React.FC = () => {
  return (
    <section className="min-h-screen w-full flex flex-col items-center bg-gray-100" aria-labelledby="page-title">
      <Helmet>
        <title>Our Process | Design & Construction by New Gen Patio</title>
        <meta
          name="description"
          content="Our design and construction process is ready to be discovered. A transparent, collaborative 4-phase journey to create your dream outdoor space without complications."
        />
        <link rel="canonical" href="https://www.newgenpatio.com/how-we-doit" />
      </Helmet>

      <SectionBlock sections={sectionsData} />
      <MarqueeBanner />

      <div className="flex flex-col items-center my-10 gap-10 max-w-screen-lg px-5">

        <h2 className="text-4xl font-semibold text-center mb-4" id="process-heading">
          Our 8-Step Construction Process
        </h2>
        <div className="w-20 h-1 bg-[#0d4754] rounded-full mb-6"></div>

        <article aria-labelledby="step-1-heading">
          <ImgTxtSection
            stepLabel="Step 1:"
            title="Request a free online quote or call us for a rough estimate."
            text="We make the first contact easy, providing you with an initial cost estimate with no commitment. Just send us basic details about your space and the type of project you have in mind."
            imageUrl=""
            imagePosition="right"
          >
            <ImageSlider
              alt="Step 1 images"
              images={["assets/images/Steps/1.webp"]}
            />
          </ImgTxtSection>
        </article>

        <article aria-labelledby="step-2-heading">
          <ImgTxtSection
            stepLabel="Step 2:"
            title="Schedule a free in-home consultation."
            text="We visit your property to assess the available space and discuss your ideas. This step is crucial to understanding your needs and ensuring the design perfectly fits your space and style."
            imageUrl=""
            imagePosition="left"
          >
            <ImageSlider
              alt="Step 2 images"
              images={["/assets/images/Steps/2.1.webp", "/assets/images/Steps/2.webp"]}
            />
          </ImgTxtSection>
        </article>

        <article aria-labelledby="step-3-heading">
          <ImgTxtSection
            stepLabel="Step 3:"
            title="Receive a formal quote with 3D renderings and project scope."
            text="We present a detailed proposal, including 3D images so you can visualize the final result. It also outlines materials, project timelines, and transparent pricing."
            imageUrl=""
            imagePosition="right"
          >
            <ImageSlider
              alt="Step 3 images"
              images={["/assets/images/Steps/3.1.webp", "/assets/images/Steps/3.webp"]}
            />
          </ImgTxtSection>
        </article>

        <article aria-labelledby="step-4-heading">
          <ImgTxtSection
            stepLabel="Step 4:"
            title="Sign the approved proposal and submit a 25% deposit."
            text="Signing the approved proposal ensures that every detail is clearly defined and aligned with your expectations. The initial deposit allows us to begin planning and securing materials."
            imageUrl=""
            imagePosition="left"
          >
            <ImageSlider
              alt="Step 4 images"
              images={["/assets/images/Steps/4.webp"]}
            />
          </ImgTxtSection>
        </article>

        <article aria-labelledby="step-5-heading">
          <ImgTxtSection
            stepLabel="Step 5:"
            title="Schedule the construction start date."
            text="We coordinate an efficient work schedule to minimize disruptions and ensure the project stays on track."
            imageUrl=""
            imagePosition="right"
          >
            <ImageSlider
              alt="Step 5 images"
              images={["/assets/images/Steps/5.webp"]}
            />
          </ImgTxtSection>
        </article>

        <article aria-labelledby="step-6-heading">
          <ImgTxtSection
            stepLabel="Step 6:"
            title="Get regular updates before construction."
            text="We keep in touch to provide updates on project progress, answer any questions, and ensure everything is ready for construction."
            imageUrl=""
            imagePosition="left"
          >
            <ImageSlider
              alt="Step 6 images"
              images={["/assets/images/Steps/6.1.webp", "/assets/images/Steps/6.2.webp"]}
            />
          </ImgTxtSection>
        </article>

        <article aria-labelledby="step-7-heading">
          <ImgTxtSection
            stepLabel="Step 7:"
            title="Construction begins! Our team ensures quality at every step."
            text="Our experts execute the project with precision and attention to detail, ensuring that every material and technique meets the highest quality standards."
            imageUrl=""
            imagePosition="right"
          >
            <ImageSlider
              alt="Step 7 images"
              images={[
                "/assets/images/Steps/7 (1).webp",
                "/assets/images/Steps/7 (2).webp",
                "/assets/images/Steps/7 (3).webp",
              ]}
            />
          </ImgTxtSection>
        </article>

        <article aria-labelledby="step-8-heading">
          <ImgTxtSection
            stepLabel="Step 8:"
            title="Final walk-through and review."
            text="We conduct a detailed inspection with you to ensure everything is flawless. We make sure you are 100% satisfied before final delivery."
            imageUrl=""
            imagePosition="left"
          >
            <video
              className="rounded-lg shadow-md w-150 object-cover aspect-[3/2]"
              src="/assets/images/Steps/8.webm"
              controls
              autoPlay
              muted
            />
          </ImgTxtSection>
        </article>

        <FreeQuoteButton 
          questionText="¿Do you want to get a Free Quote?"
          buttonText="Get a Free Quote"
        />
      </div>

      <MarqueeBanner />
    </section>
  );
};

export default OurProcess;
