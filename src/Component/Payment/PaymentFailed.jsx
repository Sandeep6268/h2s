// src/components/Payment/PaymentFailed.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/'); // Change to your actual pricing or payment route
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4 text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h2>
      <p className="text-gray-700 mb-6">
        Oops! Something went wrong while processing your payment.
      </p>
      <button
        onClick={handleRetry}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      >
        Try Again
      </button>
    </div>
  );
};

export default PaymentFailed;
