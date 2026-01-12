import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import BlockSectionEs from "../../components/BlockSectionEs";

const FormPageEs: React.FC = () => {
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
      setErrorMsg("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const encodedMessage = encodeURIComponent(
      `¡Hola, te escribo desde el sitio web!\n\n` +
      `• *Nombre:* ${name}\n` +
      `• *Teléfono:* ${phone}\n` +
      `• *Email:* ${email}\n` +
      `• *Código Postal:* ${zip}\n` +
      `${notes ? `🔹 *Notas:* ${notes}` : "*Notas:* Ninguna"}`
    );

    window.open(`https://wa.me/+13465819082?text=${encodedMessage}`, "_blank");
  };

  return (
    <section
      className="h-content min-h-screen flex flex-col items-center justify-center bg-[url('/assets/images/Products/Patios&Pergolas/Attached/20.webp')] bg-cover bg-center"
      aria-labelledby="contact-form-title"
    >
      <BlockSectionEs />

      <div className="w-full h-content min-h-[calc(100vh-80px)] bg-black/50 flex items-center justify-center px-4 py-10">
        <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 id="contact-form-title" className="text-2xl font-semibold text-center mb-4">
            ¡Contáctanos!
          </h2>

          {errorMsg && <p className="text-red-500 text-sm text-center mb-3">{errorMsg}</p>}

          <div className="flex flex-col gap-4">
            <input
              type="text"
              id="name"
              placeholder="Nombre Completo"
              className="border border-gray-300 rounded-md px-4 py-2"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              aria-label="Nombre Completo"
            />

            <input
              type="tel"
              id="phone"
              placeholder="Teléfono (Solo números)"
              className="border border-gray-300 rounded-md px-4 py-2"
              value={formData.phone}
              onChange={handleChange}
              required
              autoComplete="tel"
              aria-label="Número de Teléfono"
            />

            <input
              type="email"
              id="email"
              placeholder="Correo electrónico (ejemplo@ejemplo.com)"
              className="border border-gray-300 rounded-md px-4 py-2"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              aria-label="Dirección de Correo Electrónico"
            />

            <input
              type="text"
              id="zip"
              placeholder="Código Postal (Solo números)"
              className="border border-gray-300 rounded-md px-4 py-2"
              value={formData.zip}
              onChange={handleChange}
              required
              autoComplete="postal-code"
              aria-label="Código Postal"
            />

            <textarea
              id="notes"
              placeholder="Notas (Opcional)"
              className="border border-gray-300 rounded-md px-4 py-2 h-24"
              value={formData.notes}
              onChange={handleChange}
              aria-label="Notas Adicionales"
              aria-describedby="notes-description"
            ></textarea>

            <button
              onClick={sendToWhatsApp}
              className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 focus:ring-2 focus:ring-green-500"
              aria-label="Enviar mensaje por WhatsApp"
            >
              <FaWhatsapp className="mr-2" /> Enviar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormPageEs;