import { FaInstagram, FaTiktok } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <>
      <section className="border-t-1 border-black/20 relative">
        <div className="flex flex-col items-center justify-center pt-[70px]">
          <h3 className="font-semibold text-4xl text-center px-1">
            +300 Project Completed
          </h3>
          <div className="w-30 h-[3px] background-skyblue my-4 rounded-full"></div>
        </div>
        <div className="relative w-full">
          <div className="absolute top-0 left-0 w-full h-[67px] bg-white z-10"></div>
          <iframe
            className="w-screen h-[500px] relative z-0"
            src="https://www.google.com/maps/d/embed?mid=1vO80YEvHvKl5MYKvlnHiZ6L6cdQo4Xc&amp;ehbc=2E312F"
          ></iframe>
        </div>
      </section>
      <footer
        id="contact"
        className="bg-[#0D4C5F] flex items-center justify-center"
      >
        <section
          id="contacto"
          className="w-screen max-w-[1400px] flex flex-col items-center justify-center py-10 md:px-10"
        >
          {/* Formulario de contacto */}
          <h2 className="text-white text-5xl font-semibold mb-4">
            Get in Touch
          </h2>
          <div className="md:w-screen md:flex md:justify-between px-5 max-w-[1100px]">
            <div className="flex flex-col items-center justify-center gap-3 h-70 text-center text-white p-6 w-full max-w-md mt-6 md:mt-10 md:h-100">
                <h2 className="text-2xl font-bold md:text-3xl">
                  CONTACT US NOW!
                </h2>
                <p className="mt-2 text-xl text-white/80 md:text-2xl">
                  Within your reach!
                </p>
                <p className="text-2xl font-bold md:text-3xl">
                  DO YOU WANT TO GET IN TOUCH
                </p>
                <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded-full font-semibold hover:bg-orange-600 cursor-pointer">
                  CLICK HERE
                </button>
            </div>

            {/* Tarjeta de financiamiento */}
            <div className="flex flex-col items-center justify-center gap-3 h-70 bg-gradient-to-br from-red-800 to-purple-800 text-center text-white p-6 rounded-lg shadow-lg w-full max-w-md mt-6 md:mt-10 md:h-100">
              <h2 className="text-2xl font-bold md:text-3xl">
                FLEXIBLE FINANCING!
              </h2>
              <p className="mt-2 text-xl text-white/80 md:text-2xl">
                Options available for up to
              </p>
              <p className="text-2xl font-bold md:text-3xl">
                18 MONTHS at 0% INTEREST!
              </p>
              <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded-full font-semibold hover:bg-orange-600 cursor-pointer">
                APPLY NOW!
              </button>
            </div>
          </div>

          <div className="text-white pl-5 pt-5 flex flex-col w-[100%] max-w-[1920px] gap-5 md:pl-0 lg:flex-row">
            <div>
              <h4 className="font-semibold text-2xl mb-3">NEW GEN PATIO</h4>
              <p>
                Transforming your outdoor spaces with expertly crafted patios
                and pergolas.
                <div className="h-3 bg-transparent"></div>
                We specialize in creating comfortable, beautiful spaces for
                family gatherings, outdoor relaxation, and lasting memories.
                <div className="h-3 bg-transparent"></div>
                Design, quality, and communication at the heart of every
                project.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-2xl mb-3">CONTACT</h4>
              <a>346-581-9082</a>
              <div></div>
              <a>info@newgenpatio.io</a>
            </div>
            <div>
              <h4 className="font-semibold text-2xl mb-3">LOCATION</h4>
              <p>17903 Shaw Rd,Cypress,Condado de Harris,Texas, US</p>
            </div>
          </div>

          <div className="flex gap-3">
              <a
                href="https://www.instagram.com/tu_usuario"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-6 h-6 text-white hover:text-pink-500 transition-colors" />
              </a>
              <a
                href="https://www.tiktok.com/@tu_usuario"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok className="w-6 h-6 text-white hover:text-white/70 transition-colors" />
              </a>
          </div>
          <div className="bg-white/40 h-[1px] w-[99.1vw] my-5"></div>

          <div className="flex flex-col pl-5 gap-5 w-[100%] text-white md:pl-0 max-w-[1920px]">
            <p>© 2024 NEW GEN PATIO ALL RIGHTS RESERVED</p>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
