import React from "react";
import { Link } from "react-router-dom";

const FinancingOptions: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center p-6 h-screen">
      <Link to="//">
        <img
          src="/assets/logo.png"
          alt="New Gen Patio Logo"
          className="w-32 h-auto mb-4"
        />
      </Link>

      <h2 className="text-2xl font-bold text-gray-800">
        Flexible Financing Options
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Choose the Best Payment Plan for Your Outdoor Project
      </p>

      <div className="flex gap-6">
        <a
          href="https://app.vistafi.com/Application/s/flow/Application_Form"
          target="_blank"
          rel="noopener noreferrer"
          className="shadow-md rounded-lg overflow-hidden border border-gray-300 hover:shadow-lg transition"
        >
          <img
            src="/assets/vistafi.png"
            alt="VistaFi Financing"
            className="w-48 h-auto"
          />
        </a>

        <a
          href="https://gethearth.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="shadow-md rounded-lg overflow-hidden border border-gray-300 hover:shadow-lg transition"
        >
          <img
            src="/assets/hearth.png"
            alt="Hearth Financing"
            className="w-48 h-auto"
          />
        </a>
      </div>
    </section>
  );
};

export default FinancingOptions;
