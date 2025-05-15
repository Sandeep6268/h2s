// src/components/Payment/CashfreePayment.js
import React, { useContext, useState } from 'react';
import { Context } from '../../Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CashfreePayment = ({ price, redirectUrl }) => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const initiatePayment = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Call backend to create Cashfree order
      const response = await axios.post(
        'https://h2s-backend-urrt.onrender.com/api/create-cashfree-order/',
        {
          course_url: redirectUrl,
          amount: price
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          }
        }
      );

      // Redirect to Cashfree payment page
      window.location.href = response.data.payment_link;

    } catch (err) {
      setError(err.response?.data?.error || 'Payment initiation failed');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={initiatePayment}
        disabled={loading}
        className="payment-button"
      >
        {loading ? 'Processing...' : `Pay ₹${price}`}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CashfreePayment;