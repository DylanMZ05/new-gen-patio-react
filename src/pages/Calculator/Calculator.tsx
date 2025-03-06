import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const Calculator: React.FC = () => {
  const [amount, setAmount] = useState(72000);
  const [apr, setApr] = useState(15.3);
  const [months, setMonths] = useState(5);

  // Optimización de cálculo para evitar renders innecesarios
  const monthlyPayment = useMemo(() => {
    const monthlyRate = apr / 100 / 12;
    return months > 0
      ? ((amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))).toFixed(2)
      : "0.00";
  }, [amount, apr, months]);

  return (
    <section className="w-full flex flex-col lg:flex-row items-center justify-center gap-5 pt-[100px] pb-3 md:py-[100px] px-3 md:px-[50px]">
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-[#0d4754]">
          We offer easy financing options for your project
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Estimate your monthly payment:
        </p>

        {/* Slider - Monto */}
        <div className="mb-4">
          <label className="font-semibold">Amount</label>
          <p className="text-xl font-bold text-[#0d4754]">${amount.toLocaleString()}</p>
          <input
            type="range"
            min="500"
            max="200000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-[4px] cursor-pointer"
          />
        </div>

        {/* Slider - APR */}
        <div className="mb-4">
          <label className="font-semibold">APR</label>
          <p className="text-xl font-bold text-[#0d4754]">{apr}%</p>
          <input
            type="range"
            min="0.1"
            max="39"
            step="0.1"
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
            className="w-full h-[4px] cursor-pointer"
          />
        </div>

        {/* Slider - Plazo en meses */}
        <div className="mb-4">
          <label className="font-semibold">Financing term (months)</label>
          <p className="text-xl font-bold text-[#0d4754]">{months} months</p>
          <input
            type="range"
            min="1"
            max="120"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full h-[4px] cursor-pointer"
          />
        </div>
      </div>

      {/* Resultado */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-red-700 to-purple-600 text-white p-6 py-15 shadow-lg rounded-lg max-w-2xl w-full text-center md:h-[515px] md:py-6">
        <h3 className="text-4xl font-bold">Total Amount:</h3>
        <p className="text-4xl font-semibold text-white/90 my-3">${amount.toLocaleString()}</p>
        <h3 className="text-4xl font-bold mt-5">Monthly Payment:</h3>
        <p className="text-4xl font-semibold text-white/90 my-3">${monthlyPayment}</p>
        <Link
          to="/financing-options"
          className="mt-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full cursor-pointer"
        >
          SEE YOUR PERSONALIZED OFFERS
        </Link>
      </div>
    </section>
  );
};

export default Calculator;
