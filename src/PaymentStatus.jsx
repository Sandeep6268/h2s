import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from './api';

function PaymentStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, paymentId } = location.state || {};

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) throw new Error("Not authenticated");

        // Verify payment with backend
        const response = await API.post(
          "/verify-payment/",
          { orderId, paymentId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          // Redirect to course page
          navigate(response.data.redirectUrl);
        } else {
          // Show payment failed message
          alert("Payment verification failed");
          navigate("/"); // Or wherever you want to send failed payments
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        alert("Error verifying payment");
        navigate("/");
      }
    };

    if (orderId && paymentId) {
      verifyPayment();
    } else {
      navigate("/");
    }
  }, [orderId, paymentId, navigate]);

  return (
    <div className="payment-status">
      <h2>Verifying your payment...</h2>
      <p>Please wait while we verify your payment details.</p>
    </div>
  );
}

export default PaymentStatus;