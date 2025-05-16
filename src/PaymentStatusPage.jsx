import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FindUser } from "./api"; // Ensure this is correctly imported

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

        // Debugging: Log the parameters we received
        console.log({
          orderId,
          paymentId,
          courseUrl,
          fullQuery: location.search
        });

        if (!orderId || !paymentId) {
          throw new Error("We couldn't find your payment details. Please contact support.");
        }

        setStatus("Verifying payment with bank...");

        // 1. Verify payment with backend
        const verifyResponse = await FindUser.get(
          `/verify-payment/?order_id=${orderId}&payment_id=${paymentId}`
        );

        if (verifyResponse.data.status !== "SUCCESS") {
          throw new Error(verifyResponse.data.message || "Payment verification failed");
        }

        setStatus("Registering your course access...");

        // 2. Enroll in course
        await FindUser.post("/purchase-course/", {
          order_id: orderId,
          payment_id: paymentId,
          course_url: courseUrl
        });

        // 3. Redirect to course
        setStatus("Payment successful! Redirecting...");
        setTimeout(() => {
          window.location.href = courseUrl || "/my-courses";
        }, 1500);

      } catch (error) {
        console.error("Payment processing error:", error);
        setStatus(error.message || "Payment processing failed");
        setTimeout(() => navigate("/"), 5000);
      }
    };

    verifyPayment();
  }, [location, navigate]);

  return (
    <div className="payment-status-page">
      <div className="payment-status-card">
        <h2>{status}</h2>
        {status.includes("Verifying") && (
          <div className="loading-spinner"></div>
        )}
        {status.includes("failed") && (
          <button 
            onClick={() => navigate("/")}
            className="retry-button"
          >
            Return to Home
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;