import { FaInstagram, FaTiktok, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from 'react-router-dom';
import useScrollToTop from "../../hooks/scrollToTop";

const Footer: React.FC = () => {
  const scrollToTop = useScrollToTop();

  return (
    <>
      <section className="border-t-1 border-black/20 relative w-full">
        <div className="flex flex-col items-center justify-center pt-[70px]">
          <h3 className="font-semibold text-4xl text-center px-1">
            +300 Project Completed
          </h3>
          <div className="w-30 h-[3px] background-skyblue my-4 rounded-full"></div>
        </div>
        <div className="relative w-full">
          <div className="absolute top-0 left-0 w-full h-[67px] bg-white z-10"></div>
          <iframe
            className="w-full h-[500px] relative z-0"
            src="https://www.google.com/maps/d/embed?mid=1vO80YEvHvKl5MYKvlnHiZ6L6cdQo4Xc&amp;ehbc=2E312F"
          ></iframe>
        </div>
      </section>
      <footer
        id="contact"
        className="bg-[#0D4C5F] flex items-center justify-center w-full"
      >
        <section
          id="contacto"
          className="w-full max-w-[1400px] flex flex-col items-center justify-center py-10 md:px-10"
        >
          {/* Formulario de contacto */}
          <h2 className="text-white text-5xl font-semibold mb-4 text-center">
            Get in Touch
          </h2>
          <div className="md:w-full md:flex md:justify-between px-5 max-w-[1100px]">
            <div className="flex flex-col items-center justify-center gap-3 text-center text-white p-6 w-full max-w-md mt-6 md:mt-10 md:h-100">
                <h2 className="text-2xl font-bold md:text-3xl">
                  CONTACT US NOW!
                </h2>
                <p className="mt-2 text-xl text-white/80 md:text-2xl">
                  Within your reach!
                </p>
                <p className="text-2xl font-bold md:text-3xl">
                  DO YOU WANT TO GET IN TOUCH
                </p>
                <Link 
                  to="/formpage"
                  className="bg-orange-500 text-white px-4 py-2 mt-4 rounded-full font-semibold hover:bg-orange-600 cursor-pointer"
                  onClick={scrollToTop}>
                  CLICK HERE
                </Link>
            </div>

            {/* Tarjeta de financiamiento */}
            <div className="flex flex-col items-center justify-center gap-3  bg-gradient-to-br from-red-800 to-purple-800 text-center text-white p-6 rounded-lg shadow-lg w-full max-w-md mt-6 md:mt-10 md:h-100">
              <h2 className="text-2xl font-bold md:text-3xl">
                FLEXIBLE FINANCING!
              </h2>
              <p className="mt-2 text-xl text-white/80 md:text-2xl">
                Options available for up to
              </p>
              <p className="text-2xl font-bold md:text-3xl">
                18 MONTHS at 0% INTEREST!
              </p>
              <Link to="/calculator" 
                className="bg-orange-500 text-white px-4 py-2 mt-4 rounded-full font-semibold hover:bg-orange-600 cursor-pointer"
                onClick={scrollToTop}>
                APPLY NOW!
              </Link>
            </div>
          </div>

          <div className="text-white pl-5 pt-5 flex flex-col w-[100%] max-w-[1920px] gap-5 md:pl-0 lg:flex-row">
            <div>
              <div>
                <img src="/new-gen-patio-react/assets/images/IdentidadSVG/LogoBlanco.svg" alt="" className="h-20 p-2 pl-0"/>
                <h4 className="font-semibold text-2xl mb-3">NEW GEN PATIO</h4>
              </div>
              <p className="text-white/80">
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
            <div className="lg:pt-20">
              <h4 className="font-semibold text-2xl mb-3">CONTACT</h4>
              <a href={`https://wa.me/13463800845`} target="_blank" className="flex items-center gap-2 text-white/80 hover:text-orange-400">
                <FaPhoneAlt /> 13463800845
              </a>
              <div className="h-2"></div> {/* Espaciado */}
              <a href="mailto:info@newgenpatio.io" target="_blank" className="flex items-center gap-2 text-white/80 hover:text-orange-400">
                <FaEnvelope /> info@newgenpatio.io
              </a>
            </div>
            <div className="lg:pt-20">
              <h4 className="font-semibold text-2xl mb-3">LOCATION</h4>
              <a href="https://www.google.com/maps/place/New+Gen+Patio+LLC+%2F+Aluminum+Pergola+Builders+in+Houston/@30.0298581,-95.6440596,17z/data=!3m1!4b1!4m6!3m5!1s0x25f9a3b341eb1881:0xdc05fcaf6587bc2e!8m2!3d30.0298581!4d-95.6414847!16s%2Fg%2F11kj119mzn?entry=ttu&g_ep=EgoyMDI1MDMwMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                className="flex items-center gap-2 text-white/80 hover:text-orange-400">17903 Shaw Rd, Houston, TX 77429, United States</a>
                <p className="text-white/50 text-md">(Houston and surraunding areas)</p>
            </div>
            <div className="lg:pt-20">
              <h4 className="font-semibold text-2xl mb-3">SCHEDULES</h4>
              <p className="text-white/80">Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p className="text-white/80">Saturday: 9:00 AM - 4:00 PM</p>
              <p className="text-white/80">Sunday: Closed</p>
            </div>
          </div>

          <div className="flex gap-3 w-full pl-5 mt-5">
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

          {/* Nav de redireccionamiento */}
          <h4 className="text-white/90 text-xl font-semibold mt-2">Navigation</h4>
          <div className="flex flex-wrap justify-center text-white text-sm mt-4 gap-2">
            <a href="/new-gen-patio-react/#services" className="hover:text-orange-400 transition-colors">Services</a> •
            <a href="/new-gen-patio-react/#our-promise" className="hover:text-orange-400 transition-colors">Our Promise</a> •
            <a href="/new-gen-patio-react/#who-we-are" className="hover:text-orange-400 transition-colors">Who We Are</a> •
            <a href="/new-gen-patio-react/#reviews" className="hover:text-orange-400 transition-colors">Reviews</a> •
            <a href="/new-gen-patio-react/#blogs" className="hover:text-orange-400 transition-colors">Blogs</a> •
            <a href="/new-gen-patio-react/#contact" className="hover:text-orange-400 transition-colors">Contact</a>
          </div>

          <div className="bg-white/40 h-[1px] w-full my-5"></div>

          <div className="flex flex-col pl-5 gap-5 w-[100%] text-white md:pl-0 max-w-[1920px]">
            <p>© 2024 NEW GEN PATIO ALL RIGHTS RESERVED</p>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
