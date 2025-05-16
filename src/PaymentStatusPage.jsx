import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentStatus = () => {
  const [status, setStatus] = useState("Verifying payment...");
  const navigate = useNavigate();

  useEffect(() => {
    const orderId = new URLSearchParams(window.location.search).get("order_id");

    fetch(`https://h2s-backend-urrt.onrender.com/api/check-payment-status/?order_id=${orderId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "PAID") {
          // Redirect to the actual course page
          window.location.href = data.redirect_url; // e.g. /python24
        } else {
          setStatus("Payment failed or cancelled.");
          setTimeout(() => navigate("/"), 3000); // Redirect to home
        }
      })
      .catch(err => {
        console.error(err);
        setStatus("Something went wrong. Redirecting to homepage...");
        setTimeout(() => navigate("/"), 3000);
      });
  }, []);

  return <div>{status}</div>;
};

export default PaymentStatus;
