import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PaymentStatus = () => {
  const [status, setStatus] = useState("Verifying payment...");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const orderId = searchParams.get("order_id");
        const paymentId = searchParams.get("payment_id");
        const courseUrl = searchParams.get("course_url");
        console.log(response.data)
        if (!orderId || !paymentId) {
          throw new Error("Missing payment parameters");
        }

        // 1. Verify with backend
        const response = await axios.get(
          `https://h2s-backend-urrt.onrender.com/api/verify-payment/?order_id=${orderId}&payment_id=${paymentId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        // 2. Check verification result
        if (response.data.status === "SUCCESS") {
          // 3. Save course enrollment if not already done
          await axios.post(
            "https://h2s-backend-urrt.onrender.com/api/enroll-course/",
            {
              order_id: orderId,
              payment_id: paymentId,
              course_url: courseUrl,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          );

          // 4. Redirect to course
          window.location.href = courseUrl || "/my-courses";
        } else {
          throw new Error(response.data.message || "Payment verification failed");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setStatus(`Payment failed: ${error.message}`);
        setTimeout(() => navigate("/"), 3000);
      }
    };

    verifyPayment();
  }, [location, navigate]);

  return (
    <div className="payment-status-container">
      <h2>{status}</h2>
      {status.includes("Verifying") && <div className="spinner"></div>}
    </div>
  );
};

export default PaymentStatus;