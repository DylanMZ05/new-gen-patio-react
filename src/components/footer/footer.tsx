const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0D4C5F] flex items-center justify-center">
            <section id="contacto" className="w-screen max-w-[1400px] flex flex-col items-center justify-center py-10 md:px-10">
                {/* Formulario de contacto */}
                <h2 className="text-white text-5xl font-semibold mb-4">Get in Touch</h2>
                <div className="md:w-screen md:flex md:justify-between px-[50px]">
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
                    <div className="bg-gradient-to-br from-red-800 to-purple-800 p-6 rounded-lg shadow-lg w-full max-w-md mt-6 md:mt-0 text-center text-white">
                        <h2 className="text-xl font-bold">FLEXIBLE FINANCING!</h2>
                        <p className="mt-2">Options available for up to</p>
                        <p className="text-2xl font-bold">18 MONTHS at 0% INTEREST!</p>
                        <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded-lg font-semibold hover:bg-orange-600">
                            APPLY NOW!
                        </button>
                    </div>
                    
                </div>
            </section>
        </footer>
    );
};

export default Footer;