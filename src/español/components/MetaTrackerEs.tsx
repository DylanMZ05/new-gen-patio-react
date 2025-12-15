import React from "react";
import { sendMetaEvent } from "../../hooks/useMetaConversion";

const MetaTracker: React.FC = () => {
  const handlePurchase = () => {
    sendMetaEvent("Purchase", "cliente@email.com", 99.99);
  };

  return (
    <button onClick={handlePurchase} className="bg-blue-500 text-white p-2 rounded">
      Comprar
    </button>
  );
};

export default MetaTracker;