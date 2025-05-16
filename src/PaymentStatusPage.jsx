import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FindUser } from "./api";
const PaymentStatus = () => {
  const [status, setStatus] = useState("Verifying payment...");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const orderId = searchParams.get("order_id");
        const paymentId = searchParams.get("payment_id");
        const courseUrl = searchParams.get("course_url");
        const payment_status = searchParams.get("payment_status");

        console.log({
          orderId,
          paymentId,
          courseUrl,
          payment_status,
          fullQuery: location.search

        });

        if (!orderId) {
          throw new Error("Missing order information. Please contact support.");
        }

        setStatus("Verifying payment details...");
        setIsLoading(true);

        // 1. Verify payment with backend
        const verifyResponse = await FindUser.get(
          `/verify-payment/?order_id=${orderId}&payment_id=${paymentId || ""}`
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
        setIsLoading(false);
        setTimeout(() => {
          window.location.href = courseUrl || "/my-courses";
        }, 1500);
        console.log('courseee',courseUrl)
        console.log('pay',paymentId)

      } catch (error) {
        console.error("Payment processing error:", error);
        setStatus(error.message || "Payment processing failed");
        setIsLoading(false);
        setIsError(true);
        setTimeout(() => navigate("/"), 10000);
      }
    };

    verifyPayment();
  }, [location, navigate]);

  return (
    <div className="payment-status-container">
      <div className="payment-status-card">
        <div className="status-header">
          <h1>Payment Status</h1>
          <div className={`status-icon ${isError ? "error" : isLoading ? "loading" : "success"}`}>
            {isError ? (
              <i className="fas fa-times-circle"></i>
            ) : isLoading ? (
              <div className="spinner"></div>
            ) : (
              <i className="fas fa-check-circle"></i>
            )}
          </div>
        </div>
        
        <div className="status-message">
          <p>{status}</p>
          {isLoading && (
            <p className="help-text">
              This may take a few moments. Please don't close this page.
            </p>
          )}
        </div>

        {isError && (
          <div className="action-buttons">
            <button 
              onClick={() => navigate("/")}
              className="home-button"
            >
              Return to Home
            </button>
            <button 
              onClick={() => navigate("/support")}
              className="support-button"
            >
              Contact Support
            </button>
          </div>
        )}

        <div className="payment-details">
          <h3>Transaction Details</h3>
          <div className="details-grid">
            <span>Order ID:</span>
            <span>{new URLSearchParams(location.search).get("order_id") || "N/A"}</span>
            
            <span>Payment ID:</span>
            <span>{new URLSearchParams(location.search).get("payment_id") || "Pending"}</span>
            
            <span>Status:</span>
            <span className={`status-badge ${isError ? "error" : isLoading ? "pending" : "success"}`}>
              {isError ? "Failed" : isLoading ? "Processing" : "Completed"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;