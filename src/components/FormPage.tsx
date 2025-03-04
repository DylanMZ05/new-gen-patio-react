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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const sendToWhatsApp = () => {
    const { name, phone, email, zip, notes } = formData;

    if (!name || !phone || !email || !zip) {
      alert("Please fill out all required fields.");
      return;
    }

    const message = `Hello, I'm speaking to you from the website!%0A%0A
    • *Name:* ${name}%0A
    • *Phone:* ${phone}%0A
    • *Email:* ${email}%0A
    • *Zip Code:* ${zip}%0A
    • ${notes ? `🔹 *Notes:* ${notes}%0A` : "*Notes:* None"}`;

    const whatsappURL = `https://wa.me/13463800845?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Contact Us!</h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            id="phone"
            placeholder="Phone (Only numbers)"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            id="email"
            placeholder="Email (example@example.com)"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            id="zip"
            placeholder="Zip Code (Only numbers)"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={formData.zip}
            onChange={handleChange}
            required
          />

          <textarea
            id="notes"
            placeholder="Notes (Optional)"
            className="border border-gray-300 rounded-md px-4 py-2 h-24"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>

          <button
            onClick={sendToWhatsApp}
            className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 cursor-pointer"
          >
            <FaWhatsapp className="mr-2" /> Send via WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default FormPage;