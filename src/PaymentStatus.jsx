import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API, { FindUser } from './api';
// In your component state
const [showPaymentStatus, setShowPaymentStatus] = useState(false);
const [paymentData, setPaymentData] = useState(null);
const [paymentError, setPaymentError] = useState(null);

// Payment handler
const initiatePayment = async () => {
  try {
    setPaymentError(null);
    await handlePayment(coursePrice, courseUrl);
  } catch (error) {
    setPaymentError(error.message);
  }
};

// PaymentStatus component implementation
const PaymentStatus = ({ orderId, paymentId, redirectUrl, onClose }) => {
  const [status, setStatus] = useState('verifying');
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const token = localStorage.getItem("access");
        
        // 1. Verify payment with backend
        await FindUser.post(
          "/verify-payment/",
          { orderId, paymentId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // 2. Save purchased course
        await FindUser.post(
          "/purchase-course/",
          {
            course_url: redirectUrl,
            payment_id: paymentId,
            order_id: orderId,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // 3. Refresh enrolled courses
        const coursesResponse = await FindUser.get("/my-courses/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEnrolledCourses(coursesResponse.data);

        // 4. Mark as successful
        setStatus('success');
        
        // 5. Redirect after short delay
        setTimeout(() => {
          window.location.href = `${redirectUrl}?payment_id=${paymentId}`;
        }, 2000);
        
      } catch (err) {
        console.error("Payment verification failed:", err);
        setStatus('failed');
        setError(err.message);
      }
    };

    verifyPayment();
  }, [orderId, paymentId, redirectUrl]);

  return (
    <div className="payment-status-modal">
      {status === 'verifying' && (
        <div className="verifying">
          <Spinner /> {/* Your loading spinner component */}
          <p>Verifying your payment...</p>
        </div>
      )}
      
      {status === 'success' && (
        <div className="success">
          <CheckmarkIcon /> {/* Success icon */}
          <p>Payment verified! Redirecting to course...</p>
        </div>
      )}
      
      {status === 'failed' && (
        <div className="failed">
          <ErrorIcon /> {/* Error icon */}
          <p>Payment verification failed: {error}</p>
          <button onClick={onClose}>Close</button>
        </div>
      )}
    </div>
  );
};

// In your component's render method
return (
  <div>
    <button onClick={initiatePayment}>Pay Now</button>
    
    {paymentError && (
      <div className="payment-error">
        {paymentError}
      </div>
    )}
    
    {showPaymentStatus && paymentData && (
      <PaymentStatus
        orderId={paymentData.orderId}
        paymentId={paymentData.paymentId}
        redirectUrl={paymentData.redirectUrl}
        onClose={() => setShowPaymentStatus(false)}
      />
    )}
  </div>
);