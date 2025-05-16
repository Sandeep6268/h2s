// Create a new file PaymentSuccess.js in your components folder
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const redirectUrl = query.get('redirect') || '/';
    
    // Simulate payment processing delay
    const timer = setTimeout(() => {
      navigate(redirectUrl);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location, navigate]);

  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase. Redirecting you to your course...</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default PaymentSuccess;