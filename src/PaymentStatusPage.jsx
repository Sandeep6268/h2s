import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FindUser } from "./api"; // Make sure this is properly imported

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

        if (!orderId || !paymentId) {
          throw new Error("Missing payment parameters");
        }

        // 1. Verify payment with backend
        const verifyResponse = await FindUser.get(
          `/verify-payment/?order_id=${orderId}&payment_id=${paymentId}`
        );

        // 2. Check verification result
        if (verifyResponse.data.status !== "SUCCESS") {
          throw new Error(verifyResponse.data.message || "Payment verification failed");
        }

        // 3. Enroll in course
        const enrollResponse = await FindUser.post("/purchase-course/", {
          order_id: orderId,
          payment_id: paymentId,
          course_url: courseUrl
        });

        // 4. Redirect to course
        window.location.href = courseUrl || "/my-courses";

      } catch (error) {
        console.error("Payment processing error:", error);
        setStatus(`Payment failed: ${error.message}`);
        setTimeout(() => navigate("/"), 3000);
      }
    };

    verifyPayment();
  }, [location, navigate]);

  return (
    <div className="payment-status">
      <h2>{status}</h2>
      {status.includes("Verifying") && <div className="spinner"></div>}
    </div>
  );
};

export default PaymentStatus;