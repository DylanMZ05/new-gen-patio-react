import FAQItem from "../../components/FAQItem";

const faqData = [
  {
    question: "¿Cómo puedo contactar con soporte?",
    answer:
      "Puedes contactarnos a través de nuestro formulario o por correo electrónico a soporte@ejemplo.com.",
  },
  {
    question: "¿Cuánto tiempo tarda en procesarse un pedido?",
    answer: "Los pedidos suelen procesarse en un plazo de 24 a 48 horas.",
  },
  {
    question: "¿Puedo cancelar mi suscripción en cualquier momento?",
    answer:
      "Sí, puedes cancelar tu suscripción desde la configuración de tu cuenta sin penalización.",
  },
];

const FAQ: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center py-12 px-6 border-t border-black/20 overflow-hidden">
      <h2 className="font-semibold text-2xl text-center skyblue">FAQ</h2>
      <h3 className="font-semibold text-4xl text-center">
        Frequented Asked
      </h3>
      <div className="w-24 h-1 background-skyblue mt-4 mb-5 rounded-full"></div>

      <div className="w-full max-w-2xl">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      <p className="mt-5 font-normal text-xl">
        Have another question?
        <br />
        No problem,{" "}
        <a
          href="/new-gen-patio-react/"
          className="text-orange-500 font-semibold"
        >
          contact us
        </a>
        .
      </p>
    </section>
  );
};

export default FAQ;
