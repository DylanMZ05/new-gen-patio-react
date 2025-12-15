import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    zip: "",
    notes: "",
  });

  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrorMsg(""); // Limpiar error cuando el usuario escribe
  };

  const sendToWhatsApp = () => {
    const { name, phone, email, zip, notes } = formData;

    if (!name.trim() || !phone.trim() || !email.trim() || !zip.trim()) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    const encodedMessage = encodeURIComponent(
      `Hello, I'm speaking to you from the website!\n\n` +
      `• *Name:* ${name}\n` +
      `• *Phone:* ${phone}\n` +
      `• *Email:* ${email}\n` +
      `• *Zip Code:* ${zip}\n` +
      `${notes ? `🔹 *Notes:* ${notes}` : "*Notes:* None"}`
    );

    window.open(`https://wa.me/+13465819082?text=${encodedMessage}`, "_blank");
  };

  return (
    <section 
      className="h-screen flex flex-col items-center justify-center 
      bg-[url('/assets/images/Products/Patios&Pergolas/Attached/20.webp')] 
      bg-cover bg-center relative"
      aria-labelledby="contact-form-title"
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 id="contact-form-title" className="text-2xl font-semibold text-center mb-4">
          Contact Us!
        </h2>

        {errorMsg && <p className="text-red-500 text-sm text-center mb-3">{errorMsg}</p>}

        <div className="flex flex-col gap-4">
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            aria-label="Full Name"
          />

          <input
            type="tel"
            id="phone"
            placeholder="Phone (Only numbers)"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={formData.phone}
            onChange={handleChange}
            required
            autoComplete="tel"
            aria-label="Phone Number"
          />

          <input
            type="email"
            id="email"
            placeholder="Email (example@example.com)"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            aria-label="Email Address"
          />

          <input
            type="text"
            id="zip"
            placeholder="Zip Code (Only numbers)"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={formData.zip}
            onChange={handleChange}
            required
            autoComplete="postal-code"
            aria-label="Zip Code"
          />

          <textarea
            id="notes"
            placeholder="Notes (Optional)"
            className="border border-gray-300 rounded-md px-4 py-2 h-24"
            value={formData.notes}
            onChange={handleChange}
            aria-label="Additional Notes"
            aria-describedby="notes-description"
          ></textarea>

          <button
            onClick={sendToWhatsApp}
            className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 focus:ring-2 focus:ring-green-500"
            aria-label="Send message via WhatsApp"
          >
            <FaWhatsapp className="mr-2" /> Send via WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default FormPage;
