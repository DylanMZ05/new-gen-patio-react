import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-2xl border-b border-gray-300 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-xl font-semibold flex justify-between items-center"
      >
        {question}
        <span className="text-2xl transition-transform duration-300 cursor-pointer">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

export default FAQItem;
