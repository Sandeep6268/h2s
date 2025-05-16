import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FindUser } from './api';

const PaymentStatusPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await FindUser.post('/verify-payment/', {
          orderId
        });
        
        if (response.data.status === 'success') {
          // Get course URL from order details
          const orderDetails = await FindUser.get(`/order-details/${orderId}/`);
          navigate(orderDetails.data.course_url);
        } else {
          navigate('/'); // Redirect to home if payment failed
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        navigate('/');
      }
    };

    if (orderId) {
      verifyPayment();
    } else {
      navigate('/');
    }
  }, [orderId, navigate]);

  return (
    <div className="payment-status-container">
      <h2>Verifying your payment...</h2>
      <p>Please wait while we confirm your payment details.</p>
    </div>
  );
};

export default PaymentStatusPage;