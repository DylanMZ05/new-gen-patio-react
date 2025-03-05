import React from "react";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";

const sectionsData = [
  {
    id: 1,
    title: "About Us",
    description: "At New Gen Patio, we craft high-quality aluminum patios and pergolas, enhancing your outdoor living with style and function.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/04.webp",
  },
];

const AboutUsPage: React.FC = () => {

  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-100">
      <SectionBlock sections={sectionsData} />
      <MarqueeBanner />

      <div className="flex flex-col my-10 gap-10 items-center">
        <div className="max-w-[1080px]">
          <h3 className="text-center font-semibold text-4xl mb-3 text-black/90">Who we are</h3>
          <div className="w-25 h-1 background-skyblue mt-4 mb-3 mx-auto rounded-4xl"></div>
          <p className="px-5 font-semibold text-black/80">At New Gen Patio, we are more than builders. We are visionaries who transform outdoor spaces into stunning, functional extensions of your home. With a passion for design, craftsmanship, and customer satisfaction, we specialize in creating high quality aluminum covered patios and pergolas that enhance the way you live, relax and entertain.</p>
        </div>
        
        <div className='relative w-[99.1vw] h-max flex flex-col items-center justify-center bg-cover bg-center bg-fixed bg-[url("assets/images/Products/Patios&Pergolas/Cantilever/03.webp")]'>
          <div id="our-promise" className="w-full bg-black/70 py-[50px] px-[25px] items-center">
            <h3 className="text-center font-semibold text-4xl text-white">Our Story</h3>
            <div className="w-25 h-1 bg-orange-600 mt-4 mb-3 mx-auto rounded-4xl"></div>
            <p className="text-md text-white/80 mb-4 max-w-[1080px] mx-auto px-5">Founded by Rafael Cuza and Alejandro Alonso, New Gen Patio was built on a foundation of excellence, integrity, and commitment. With years of experience in the Texas aluminum construction industry, we recognized the need for high quality, weather resistant outdoor structures that elevate both residential and commercial properties. Our expertise, combined with a customer-centric approach, has positioned us as industry leaders in the field.</p>
          </div>
        </div>
        <div>
          <h3 className="text-center font-semibold text-4xl">Why Choose Us?</h3>
          <div className="w-25 h-1 background-skyblue mt-4 mb-3 rounded-4xl mx-auto"></div>
        </div>
        <ImgTxtSection
          title="Expert Craftsmanship"
          text="Our team of professionals ensures every project is executed with precision and high-quality materials."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/06.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Custom Designs"
          text="We tailor each project to your unique vision, ensuring a personalized and aesthetically pleasing outcome."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/11.webp"
          imagePosition="left"
        />

        <ImgTxtSection
          title="Durability & Quality"
          text="Our aluminum structures are built to withstand the elements, offering longevity and minimal maintenance."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/20.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Exceptional Customer Service"
          text="We prioritize communication, transparency, and satisfaction at every stage of the process."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/23.webp"
          imagePosition="left"
        />
        
        <ImgTxtSection
          title="Safety & Compliance"
          text="We adhere to the highest safety and regulatory standards, ensuring secure and structurally sound installations."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/25.webp"
          imagePosition="right"
        />
        <hr className="text-black/20"/>
        <div className="max-w-[1080px]">
          <h3 className="text-center font-semibold text-4xl mb-3 text-black/90">Our Commitment to You</h3>
          <div className="w-25 h-1 background-skyblue mt-4 mb-3 mx-auto rounded-4xl"></div>
          <p className="px-5 font-semibold text-black/80 md:mx-5">At New Gen Patio, we don’t just build patios. We create experiences. Whether you're looking to host gatherings, enjoy peaceful moments with your family, or enhance your property's value, we are dedicated to bringing your vision to life with superior craftsmanship and a commitment to excellence.</p>
          <p className="px-5 font-semibold text-black/80 mt-5 md:mx-5">Join the New Gen Patio family and let’s create the outdoor space of your dreams!</p>
          <div className="flex flex-col px-5 justify-between gap-5 md:flex-row md:max-w-[1080px] md:mx-auto">
            <div>
              <img className="w-full aspect-[3/2] mt-3 object-cover rounded-2xl shadow-lg md:w-250" src="assets/images/Products/Patios&Pergolas/Attached/11.webp" alt="" />
              <p className="px-5">Foto de Rafa con texto </p>
            </div>
            <div>
              <img className="w-full aspect-[3/2] mt-3 object-cover rounded-2xl shadow-lg md:w-250" src="assets/images/Products/Patios&Pergolas/Attached/12.webp" alt="" />
              <p className="px-5">Foto de Ale con texto</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
