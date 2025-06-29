import React from "react";
import MarqueeBanner from "../../components/MarqueeBanner";
import { Wrench, PencilRuler, ShieldCheck, Handshake, CheckCircle } from "lucide-react";
import FreeQuoteButton from "../../components/FreeQuoteButton";


const AboutUsPage: React.FC = () => {

  const benefits = [
    { icon: <Wrench size={32} className="text-orange-600" />, title: "Expert Craftsmanship", text: "Our team ensures precision and high-quality materials." },
    { icon: <PencilRuler size={32} className="text-orange-600" />, title: "Custom Designs", text: "We tailor each project to your vision." },
    { icon: <ShieldCheck size={32} className="text-orange-600" />, title: "Durability & Quality", text: "Weather-resistant aluminum structures for longevity." },
    { icon: <Handshake size={32} className="text-orange-600" />, title: "Exceptional Customer Service", text: "We prioritize communication and satisfaction." },
    { icon: <CheckCircle size={32} className="text-orange-600" />, title: "Safety & Compliance", text: "We follow the highest industry standards." },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-100" aria-labelledby="about-us-heading">

      <section className="w-full">
        {/* Sección 1 */}
        <div
          className="relative flex flex-col items-center justify-center text-center w-full h-[34vh] bg-cover bg-center"
          aria-labelledby="section-title-1"
          role="region"
          style={{
            backgroundImage: `url(assets/images/Products/Patios&Pergolas/Attached/23.webp)`,
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-black/80"></div>

          <div className="relative z-10 flex flex-col items-center text-white px-6 max-w-3xl">
            <h1 id="section-title-1" className="text-4xl font-semibold">
              Meet the Experts Behind New Gen Patio
            </h1>
            <div className="w-28 h-[3px] bg-orange-600 mt-3 mb-2 rounded-full"></div>
            <p className="text-xl mb-5 text-white/80">
              We craft high-quality aluminum patios and pergolas, enhancing your outdoor living with style and function.
            </p>
          </div>
        </div>
      </section>
      <MarqueeBanner />

      <div className="flex flex-col my-10 gap-0 items-center max-w-[1080px] w-full px-5">
        {/* Who We Are */}
        <header className="text-center mb-10">
          <h2 className="font-semibold text-4xl mb-3 text-black/90">Who We Are</h2>
          <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-3 mx-auto rounded-full"></div>
          <p className="font-semibold text-black/80">
          We are passionate creators of outdoor spaces, transforming them into stunning, functional extensions of your home. With a deep love for design, craftsmanship, and customer satisfaction, we build high-quality aluminum covered patios and pergolas that enhance your lifestyle.
          </p>
        </header>

        {/* Our Story */}
        <section
          className="relative w-screen flex flex-col items-center justify-center bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url("assets/images/Products/Patios&Pergolas/Cantilever/03.webp")` }}
          aria-labelledby="our-story-heading"
        >
          <div className="w-full bg-black/70 py-12 px-6 text-center">
            <h2 id="our-story-heading" className="font-semibold text-4xl text-white">Our Story</h2>
            <div className="w-24 h-1 bg-orange-600 mt-4 mb-3 mx-auto rounded-full"></div>
            <p className="text-lg text-white/80 max-w-[1080px] mx-auto">
              Founded by Rafael Cuza and Alejandro Alonso, New Gen Patio was built on a foundation of excellence, integrity, and commitment. With years of experience in Texas’s aluminum construction industry, we saw the need for high-quality, weather-resistant outdoor structures that elevate both residential and commercial properties.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <header className="text-center mt-10">
          <h2 className="font-semibold text-4xl">Why Choose Us?</h2>
          <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-3 rounded-full mx-auto"></div>
        </header>

        <div className="grid gap-8 mt-3 md:grid-cols-2 md:ml-15">
          {benefits.map((item, index) => {
            const isLastOdd =
              benefits.length % 2 === 1 && index === benefits.length - 1;

            return (
              <div
                key={index}
                className={`flex items-start gap-4 ${
                  isLastOdd ? "md:col-span-2 md:justify-center" : ""
                }`}
              >
                <div>{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Our Commitment */}
        <header className="text-center mt-10">
          <h2 className="font-semibold text-4xl text-black/90">Our Commitment to You</h2>
          <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-3 mx-auto rounded-full"></div>
          <p className="font-semibold text-black/80">
            We don’t just build patios. We create experiences. Whether for gatherings, relaxation, or increasing property value, we are dedicated to bringing your vision to life with superior craftsmanship.
          </p>
          <p className="font-semibold text-black/80 mt-5">
            Join the New Gen Patio family and create the outdoor space of your dreams!
          </p>
        </header>

        <div className="w-full flex flex-col justify-between gap-5 mt-10 md:flex-row">
          <div className="flex-1 flex flex-col justify-center md:justify-start">
            <img
              className="aspect-[3/2] mt-3 object-cover object-[0%_35%] rounded-2xl shadow-lg md:w-250"
              src="assets/images/FotosDelEquipo/Rafa.webp"
              alt="Rafa - Co-founder of New Gen Patio"
              loading="lazy"
            />
            <h3 className="text-center text-2xl font-semibold mt-2 px-2">Rafa</h3>
            <p className="font-semibold text-black/90 mt-1 px-3">
            We create outdoor spaces that we’re truly proud of. Every project is a reflection of our passion for design, quality, and craftsmanship. We carefully select high-quality, low-maintenance materials that ensure durability and elegance for years to come. It’s not just about making something that looks great; it’s about building something that lasts, something that feels just right. We put our heart into every detail, from the structure’s strength to the finishing touches, because we believe our customers deserve the best.
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-center md:justify-start">
            <img
              className="aspect-[3/2] mt-3 object-cover object-[0%_35%] rounded-2xl shadow-lg md:w-250"
              src="assets/images/FotosDelEquipo/Ale.webp"
              alt="Alex - Co-founder of New Gen Patio"
              loading="lazy"
            />
            <h3 className="text-center text-2xl font-semibold mt-2 px-2">Alex</h3>
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
              alt="Marianne - Office Supervisor"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold mt-2">Marianne</h3>
            <p>Office Supervisor</p>
          </div>

          {/* Card 2: Javier */}
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-full mt-3 object-cover rounded-2xl shadow-lg md:w-150"
              src="assets/images/FotosDelEquipo/Javier.webp"
              alt="Javier - Project Consultant"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold mt-2">Javier</h3>
            <p>Project Consultant</p>
          </div>

          {/* Card 3: Rodolfo */}
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-full mt-3 object-cover rounded-2xl shadow-lg md:w-150"
              src="assets/images/FotosDelEquipo/Rodolfo.webp"
              alt="Rodolfo - Office Assistant"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold mt-2">Rodolfo</h3>
            <p>Office Assistant</p>
          </div>

          {/* Card 4: Lisandra */}
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-full mt-3 object-cover rounded-2xl shadow-lg md:w-150"
              src="assets/images/FotosDelEquipo/Mujer.webp"
              alt="Lisandra - Customer Service"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold mt-2">Lisandra</h3>
            <p>Customer Service</p>
          </div>

          {/* Card 5: David - se centra en md */}
          <div className="flex flex-col justify-center items-center md:col-span-2 mx-auto">
            <img
              className="w-full mt-3 object-cover rounded-2xl shadow-lg md:w-150 md:max-w-127"
              src="assets/images/FotosDelEquipo/Hombre.webp"
              alt="David - Marketing Director"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold mt-2">David</h3>
            <p>Marketing Director</p>
          </div>
        </div>

      <FreeQuoteButton 
        questionText="Not sure where to start? We’re here to help"
        buttonText="Talk to an Expert"
      />
      
      </div>
    </section>
  );
};

export default AboutUsPage;