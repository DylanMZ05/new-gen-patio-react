import React from "react";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";

const sectionsData = [
  {
    id: 1,
    title: "About Us",
    description:
      "We craft high-quality aluminum patios and pergolas, enhancing your outdoor living with style and function.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/04.webp",
  },
];

const AboutUsPage: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-100">
      <SectionBlock sections={sectionsData} />
      <MarqueeBanner />

      <div className="flex flex-col my-10 gap-10 items-center">
        <div className="max-w-[1080px] w-full px-5">
          <h3 className="text-center font-semibold text-4xl mb-3 text-black/90">
            Who we are
          </h3>
          <div className="w-25 h-1 background-skyblue mt-4 mb-3 mx-auto rounded-4xl"></div>
          <p className="font-semibold text-black/80">
            We are more than builders. We are visionaries who transform outdoor spaces into stunning, functional extensions of your home. With a passion for design, craftsmanship, and customer satisfaction, we specialize in creating high quality aluminum covered patios and pergolas that enhance the way you live, relax and entertain.
          </p>
        </div>

        <div
          className="relative w-full h-max flex flex-col items-center justify-center bg-cover bg-center bg-fixed lg:w-[99.1vw]"
          style={{
            backgroundImage: `url("assets/images/Products/Patios&Pergolas/Cantilever/03.webp")`,
          }}
        >
          <div id="our-promise" className="w-full bg-black/70 py-[50px] px-[25px] items-center">
            <h3 className="text-center font-semibold text-4xl text-white">
              Our Story
            </h3>
            <div className="w-25 h-1 bg-orange-600 mt-4 mb-3 mx-auto rounded-4xl"></div>
            <p className="text-md text-white/80 mb-4 max-w-[1080px] mx-auto">
              Founded by Rafael Cuza and Alejandro Alonso, New Gen Patio was built on a foundation of excellence, integrity, and commitment. With years of experience in the Texas aluminum construction industry, we recognized the need for high quality, weather resistant outdoor structures that elevate both residential and commercial properties. Our expertise, combined with a customer-centric approach, has positioned us as industry leaders in the field.
            </p>
          </div>
        </div>

        <div className="w-full max-w-[1080px] px-5">
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

        <hr className="text-black/20" />

        <div className="w-full max-w-[1080px] px-5">
          <h3 className="text-center font-semibold text-4xl mb-3 text-black/90">
            Our Commitment to You
          </h3>
          <div className="w-25 h-1 background-skyblue mt-4 mb-3 mx-auto rounded-4xl"></div>
          <p className="font-semibold text-black/80">
            We don’t just build patios. We create experiences. Whether you're looking to host gatherings, enjoy peaceful moments with your family, or enhance your property's value, we are dedicated to bringing your vision to life with superior craftsmanship and a commitment to excellence.
          </p>
          <p className="font-semibold text-black/80 mt-5">
            Join the New Gen Patio family and let’s create the outdoor space of your dreams!
          </p>

          <div className="w-full flex flex-col justify-between gap-5 mt-10 md:flex-row">
            <div className="flex-1 flex flex-col justify-center md:justify-start">
              <img
                className="aspect-[3/2] mt-3 object-cover object-[0%_35%] rounded-2xl shadow-lg md:w-250"
                src="assets/images/FotosDelEquipo/Rafa.webp"
                alt=""
              />
              <h3 className="text-2xl font-bold mt-2 px-2">Rafa</h3>
              <div className="w-10 h-[3px] bg-[#0d4754] ml-3 mt-1 rounded-full"></div>
              <p className="font-semibold text-black/90 mt-1 px-3">
                We create outdoor spaces that we’re truly proud of. Every project is a reflection of our passion for design, quality, and craftsmanship. We carefully select high-quality, low-maintenance materials that ensure durability and elegance for years to come. It’s not just about making something that looks great; it’s about building something that lasts, something that feels just right. We put our heart into every detail, from the structure’s strength to the finishing touches, because we believe our customers deserve the best.
              </p>
            </div>
            <div className="flex-1 flex flex-col justify-center md:justify-start">
            <img
                className="aspect-[3/2] mt-3 object-cover object-[0%_35%] rounded-2xl shadow-lg md:w-250"
                src="assets/images/FotosDelEquipo/Ale.webp"
                alt=""
              />
              <h3 className="text-2xl font-bold mt-2 mx-2">Alex</h3>
              <div className="w-10 h-[3px] bg-[#0d4754] ml-3 mt-1 rounded-full"></div>
              <p className="font-semibold text-black/90 mt-1 px-3">
                Having a covered patio or pergola is more than just adding a structure to your home; it's about transforming your space into a place you truly want to be. Rain or shine, it’s a place that brings people together, offering comfort, shade, and a welcoming atmosphere. There’s nothing more rewarding than seeing our patios become the heart of a home, a space designed not just for beauty but for real-life moments that matter.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Card 1: Marianne */}
            <div className="flex flex-col justify-center items-center">
              <img
                className="w-full mt-3 object-cover rounded-2xl shadow-lg md:w-150"
                src="assets/images/FotosDelEquipo/Marianne.webp"
                alt=""
              />
              <h3 className="text-xl font-semibold mt-2">Marianne</h3>
              <p>Office Supervisor</p>
            </div>

            {/* Card 2: Javier */}
            <div className="flex flex-col justify-center items-center">
              <img
                className="w-full mt-3 object-cover rounded-2xl shadow-lg md:w-150"
                src="assets/images/FotosDelEquipo/Javier.webp"
                alt=""
              />
              <h3 className="text-xl font-semibold mt-2">Javier</h3>
              <p>Project Consultant</p>
            </div>

            {/* Card 3: Rodolfo */}
            <div className="flex flex-col justify-center items-center">
              <img
                className="w-full mt-3 object-cover rounded-2xl shadow-lg md:w-150"
                src="assets/images/FotosDelEquipo/Rodolfo.webp"
                alt=""
              />
              <h3 className="text-xl font-semibold mt-2">Rodolfo</h3>
              <p>Office Assistant</p>
            </div>

            {/* Card 4: Lisandra */}
            <div className="flex flex-col justify-center items-center">
              <img
                className="w-full mt-3 object-cover rounded-2xl shadow-lg md:w-150"
                src="assets/images/FotosDelEquipo/Mujer.webp"
                alt=""
              />
              <h3 className="text-xl font-semibold mt-2">Lisandra</h3>
              <p>Customer Service</p>
            </div>

            {/* Card 5: David - se centra en md */}
            <div className="flex flex-col justify-center items-center md:col-span-2 mx-auto">
              <img
                className="w-full mt-3 object-cover rounded-2xl shadow-lg md:w-150 md:max-w-127"
                src="assets/images/FotosDelEquipo/Hombre.webp"
                alt=""
              />
              <h3 className="text-xl font-semibold mt-2">David</h3>
              <p>Marketing Director</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;