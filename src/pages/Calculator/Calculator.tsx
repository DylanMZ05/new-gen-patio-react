import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import BlockSection from "../../components/BlockSection";

const Calculator: React.FC = () => {
  const [amount, setAmount] = useState(72000);
  const [apr, setApr] = useState(15.3);
  const [months, setMonths] = useState(5);

  const monthlyPayment = useMemo(() => {
    const monthlyRate = apr / 100 / 12;
    return months > 0
      ? ((amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))).toFixed(2)
      : "0.00";
  }, [amount, apr, months]);

  return (
    <section
      role="region"
      aria-label="Financing calculator"
      className="min-h-screen bg-[url('/assets/images/Products/Patios&Pergolas/Attached/20.webp')] bg-cover bg-center"
    >
      <BlockSection />

      <main className="w-full min-h-[calc(100vh-80px)] bg-black/60 flex flex-col lg:flex-row items-center justify-center gap-5 px-3 md:px-[50px] py-10 md:py-[100px] md:flex-wrap md:text-center">
        {/* Título principal optimizado */}
        <div className="w-full text-center">
          <h1 className="text-white/90 text-3xl md:text-4xl font-bold text-center mb-2 max-w-3xl leading-tight mx-auto">
            Affordable Patio Financing Options in Houston
          </h1>
          <div
            className="bg-orange-500 border border-white/10 h-1 w-50 rounded-full mx-auto mb-6"
            aria-hidden="true"
          />
        </div>

        {/* Calculadora */}
        <section className="bg-white p-6 shadow-lg rounded-lg max-w-2xl w-full">
          <h2 className="text-2xl font-bold text-[#0d4754] mb-1">
            We offer easy financing options for your project
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Estimate your monthly payment:
          </p>

          {/* Sliders */}
          <div className="mb-4">
            <label htmlFor="amount" className="font-semibold">Amount</label>
            <p className="text-xl font-bold text-[#0d4754]">${amount.toLocaleString()}</p>
            <input
              id="amount"
              type="range"
              min="500"
              max="200000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-[4px] cursor-pointer"
              aria-label="Amount"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="apr" className="font-semibold">APR</label>
            <p className="text-xl font-bold text-[#0d4754]">{apr}%</p>
            <input
              id="apr"
              type="range"
              min="0.1"
              max="39"
              step="0.1"
              value={apr}
              onChange={(e) => setApr(Number(e.target.value))}
              className="w-full h-[4px] cursor-pointer"
              aria-label="APR"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="months" className="font-semibold">Financing term (months)</label>
            <p className="text-xl font-bold text-[#0d4754]">{months} months</p>
            <input
              id="months"
              type="range"
              min="1"
              max="120"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full h-[4px] cursor-pointer"
              aria-label="Financing term"
            />
          </div>
        </section>

        {/* Resultado */}
        <section className="flex flex-col items-center justify-center bg-gradient-to-br from-red-700 to-purple-600 text-white p-6 py-15 shadow-lg rounded-lg max-w-2xl w-full text-center md:h-[515px] md:py-6">
          <h3 className="text-4xl font-bold">Total Amount:</h3>
          <p className="text-4xl font-semibold text-white/90 my-3">${amount.toLocaleString()}</p>

          <h3 className="text-4xl font-bold mt-5">Monthly Payment:</h3>
          <p className="text-4xl font-semibold text-white/90 my-3">${monthlyPayment}</p>

          <Link
            to="/financing-options"
            className="mt-5 bg-orange-500 border border-white/10 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition-colors focus:outline-2 focus:outline-orange-300"
          >
            SEE YOUR PERSONALIZED OFFERS
          </Link>
        </section>
      </main>
    </section>
  );
};

export default Calculator;
