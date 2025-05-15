// src/components/Payment/PaymentSuccess.js
import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../Context';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(Context);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const courseUrl = query.get('course_url');
    const status = query.get('status');

    if (status === 'SUCCESS' && courseUrl) {
      // Redirect to the purchased course
      navigate(courseUrl);
    } else {
      // Handle failed payment
      navigate('/payment-failed');
    }
  }, [location, navigate, setUser]);

  return (
    <div className="payment-success">
      <h2>Payment Successful!</h2>
      <p>Redirecting to your course...</p>
    </div>
  );
};

export default PaymentSuccess;