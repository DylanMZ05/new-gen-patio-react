import { FaInstagram, FaTiktok } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0D4C5F] flex items-center justify-center">
            <section id="contacto" className="w-screen max-w-[1400px] flex flex-col items-center justify-center py-10 md:px-10">
                {/* Formulario de contacto */}
                <h2 className="text-white text-5xl font-semibold mb-4">Get in Touch</h2>
                <div className="md:w-screen md:flex md:justify-between px-[50px] max-w-[1100px]">
                    <div className=" p-6 rounded-lg w-full max-w-md">
                        <form className="flex flex-col gap-4">
                            <label className="text-white text-sm">Name</label>
                            <input type="text" placeholder="Type your name" className="p-2 rounded border border-gray-300 focus:outline-none bg-white" />

                            <label className="text-white text-sm">Email</label>
                            <input type="email" placeholder="youremail@gmail.com" className="p-2 rounded border border-gray-300 focus:outline-none bg-white" />

                            <label className="text-white text-sm">Phone number</label>
                            <input type="tel" placeholder="Example: +1 555 123-4567" className="p-2 rounded border border-gray-300 focus:outline-none bg-white" />

                            <label className="text-white text-sm">Message</label>
                            <textarea placeholder="Write your message" className="p-2 rounded border border-gray-300 focus:outline-none bg-white"></textarea>

                            <button type="submit" className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-600 cursor-pointer">
                                Send Email
                            </button>
                        </form>
                    </div>

                    {/* Tarjeta de financiamiento */}
                    <div className="flex flex-col items-center justify-center gap-3 h-70 bg-gradient-to-br from-red-800 to-purple-800 text-center text-white p-6 rounded-lg shadow-lg w-full max-w-md mt-6 md:mt-10 md:h-100">
                        <h2 className="text-2xl font-bold md:text-3xl">FLEXIBLE FINANCING!</h2>
                        <p className="mt-2 text-xl text-white/80 md:text-2xl">Options available for up to</p>
                        <p className="text-2xl font-bold md:text-3xl">18 MONTHS at 0% INTEREST!</p>
                        <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded-lg font-semibold hover:bg-orange-600">
                            APPLY NOW!
                        </button>
                    </div>
                    
                </div>

                <div className="text-white px-5 pt-5 flex flex-col gap-5">
                    <div>
                        <h4 className="font-semibold text-2xl mb-3">NEW GEN PATIO</h4>
                        <p>
                            Transforming your outdoor spaces with expertly crafted patios and pergolas.
                            <div className="h-3 bg-transparent"></div>
                            We specialize in creating comfortable, beautiful spaces for family gatherings, outdoor relaxation, and lasting memories.
                            <div className="h-3 bg-transparent"></div>
                            Design, quality, and communication at the heart of every project.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-2xl mb-3">CONTACT</h4>
                        <a>
                            346-581-9082
                        </a>
                        <a>
                            info@newgenpatio.io
                        </a>
                    </div>
                    <div>
                        <h4 className="font-semibold text-2xl mb-3">LOCATION</h4>
                        <p>
                        27805 Ellie Oak Ln, Spring, Texas. 77386
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-5 border-t-1 border-white/40 w-[99vw] mt-5 pt-5 pl-5 text-white">
                    <p>© 2024 NEW GEN PATIO ALL RIGHTS RESERVED</p>
                    <div className="flex gap-3">
                        <a href="https://www.instagram.com/tu_usuario" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="w-6 h-6 text-white hover:text-pink-500 transition-colors" />
                        </a>
                        <a href="https://www.tiktok.com/@tu_usuario" target="_blank" rel="noopener noreferrer">
                            <FaTiktok className="w-6 h-6 text-white hover:text-white/70 transition-colors" />
                        </a>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;