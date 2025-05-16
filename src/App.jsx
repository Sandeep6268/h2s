import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { Context } from "./Context";
import logo from "../public/logo-payment.jpg";
import Home from "./Pages/Home Page/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HtmlCssJs from "./Component/Courses/Courses Page/HTML CSS JS/HtmlCssJs";
import PythonDjango from "./Component/Courses/Courses Page/PYTHON AND DJANGO/PythonDjango";
import Reactjs from "./Component/Courses/Courses Page/REACT/Reactjs";
import Python from "./Component/Courses/Courses Page/Python/Python";
import NotificationPopup from "./Component/Notification/NotificationPopup";
import HtmlCss from "./Component/Courses/Courses Page/HTML CSS/HtmlCss";
import ReactandJs from "./Component/Courses/Courses Page/REACT AND JS/ReactandJs";
import Contact from "./Pages/Contact Page/Contact";
import Login from "./Pages/Login Page/Login";
import Register from "./Pages/Login Page/Register";
import About from "./Pages/About Page/About";
import InternshipPrograms from "./Pages/Course Page/InternshipPrograms";
import axios from "axios";
import API, { FindUser } from "./api";
import { jwtDecode } from "jwt-decode";
import PyandDJ from "./Component/Courses/Courses Page/Python/PyandDj";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
// import { Cashfree } from "@cashfreepayments/cashfree-sdk";
import { Cashfree } from "@cashfreepayments/cashfree-sdk";
import { useLocation } from "react-router-dom";
import PaymentStatusPage from "./PaymentStatusPage";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in milliseconds
      easing: "ease-in-out", // default easing
      once: false, // whether animation should happen only once
    });
  }, []);
  const [enrolledCourses, setEnrolledCourses] = useState();
  const [paymentStatus, setPaymentStatus] = useState({
    processing: false,
    message: "",
    showModal: false,
  });

  const [user, setUser] = useState(null); // Start with null instead of loading from localStorage

  // Single source of truth for user state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        // Verify token first
        await API.post("jwt/verify/", { token });

        const decoded = jwtDecode(token);
        const userResponse = await axios.get(
          `https://h2s-backend-urrt.onrender.com/api/user/${decoded.user_id}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUser(userResponse.data);
      } catch (error) {
        console.error("Auth initialization failed:", error);
        localStorage.removeItem("access");
        setUser(null);
      }
    };

    initializeAuth();
  }, []);

  // Persist user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Token refresh logic

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) return;

        // 1. Get new access token
        const { data } = await API.post("jwt/refresh/", { refresh });
        const newAccessToken = data.access;

        // 2. Save it
        localStorage.setItem("access", newAccessToken);

        // 3. Decode to get user ID
        const decoded = jwtDecode(newAccessToken);

        // 4. Fetch user info again
        const userResponse = await axios.get(
          `https://h2s-backend-urrt.onrender.com/api/user/${decoded.user_id}/`,
          { headers: { Authorization: `Bearer ${newAccessToken}` } }
        );

        setUser(userResponse.data);
      } catch (error) {
        console.log("Token refresh failed - logging out", error);

        // Logout user safely
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        setUser(null);
      }
    };

    const interval = setInterval(refreshToken, 1 * 60 * 1000); // 4.5 min
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // console.log("User state updated:", user);
  }, [user]);
  const stableSetUser = useCallback((newUser) => {
    setUser((prev) => {
      // Only update if something actually changed
      if (JSON.stringify(prev) !== JSON.stringify(newUser)) {
        return newUser;
      }
      return prev;
    });
  }, []);
  // In App.js

  // In your API interceptors (add to your api.js)
  API.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized request - possible token issue");
        // You might want to logout here
      }
      return Promise.reject(error);
    }
  );
  // with original api
  const handlePayment = async (price, redirectUrl) => {
    try {
      // Show processing modal
      setPaymentStatus({
        processing: true,
        message: "Preparing payment...",
        showModal: true,
      });

      const token = localStorage.getItem("access");
      if (!token) {
        setPaymentStatus({
          processing: false,
          message: "Please login first",
          showModal: true,
        });
        return;
      }

      const orderResponse = await FindUser.post(
        "/create-cashfree-order/",
        {
          amount: price,
          course_url: redirectUrl,
          phone:
            JSON.parse(localStorage.getItem("user"))?.phone || "9999999999",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { orderId, paymentSessionId } = orderResponse.data;

      if (!window.Cashfree) {
        setPaymentStatus({
          processing: false,
          message: "Payment system loading. Please refresh...",
          showModal: true,
        });
        return;
      }

      const cashfree = new window.Cashfree({ mode: "production" });
      let paymentCompleted = false;

      cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_blank",

        onSuccess: async (data) => {
          try {
            setPaymentStatus({
              processing: true,
              message: "Verifying payment...",
              showModal: true,
            });

            await FindUser.post(
              "/verify-payment/",
              { orderId, paymentId: data.paymentId },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            await FindUser.post(
              "/purchase-course/",
              {
                course_url: redirectUrl,
                payment_id: data.paymentId,
                order_id: orderId,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            setPaymentStatus({
              processing: false,
              message: "Payment successful! Redirecting...",
              showModal: true,
            });

            setTimeout(() => {
              window.location.href = `${redirectUrl}?payment_id=${data.paymentId}`;
            }, 1500);
          } catch (err) {
            setPaymentStatus({
              processing: false,
              message: "Payment verification failed. Please contact support.",
              showModal: true,
            });
          }
        },

        onFailure: (data) => {
          setPaymentStatus({
            processing: false,
            message: data?.message || "Payment failed",
            showModal: true,
          });
        },

        onClose: () => {
          if (!paymentCompleted) {
            setPaymentStatus({
              processing: false,
              message: "Payment cancelled",
              showModal: true,
            });
          }
        },
      });
    } catch (error) {
      setPaymentStatus({
        processing: false,
        message:
          error.response?.data?.error || "Payment failed. Please try again.",
        showModal: true,
      });
    }
  };
  const PaymentModal = () => {
    if (!paymentStatus.showModal) return null;

    return (
      <div className="payment-modal-overlay">
        <div className="payment-modal">
          {paymentStatus.processing ? (
            <>
              <div className="spinner"></div>
              <p>{paymentStatus.message}</p>
            </>
          ) : (
            <>
              <h3>
                {paymentStatus.message.includes("success")
                  ? "Success!"
                  : "Notice"}
              </h3>
              <p>{paymentStatus.message}</p>
              <button
                onClick={() =>
                  setPaymentStatus((prev) => ({ ...prev, showModal: false }))
                }
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  //  const handlePayment = (price, redirectUrl) => {
  //   // Get user data for prefill
  //   const user = JSON.parse(localStorage.getItem("user")) || {};

  //   const options = {
  //     key: "rzp_live_JZumJpdNJsE2Xb", // Live Key
  //     amount: price * 100,
  //     currency: "INR",
  //     name: "H2S Tech Solutions",
  //     description: "Course purchasing",
  //     image: logo,

  //     // Dynamic Prefill
  //     prefill: {
  //       name: user.name || "",
  //       email: user.email || "",
  //       contact: user.phone || "",
  //     },

  //     handler: async (response) => {
  //       try {
  //         await FindUser.post(
  //           "/purchase-course/",
  //           { course_url: redirectUrl },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${localStorage.getItem("access")}`,
  //             },
  //           }
  //         );
  //         window.location.href = redirectUrl;
  //       } catch (error) {
  //         console.error("Failed to save course:", error);
  //       }
  //     },
  //     theme: { color: "#3399cc" },
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };
  // <CashfreePayment price={coursePrice} redirectUrl={courseUrl} />;

  // Helper function to load script dynamically
  useEffect(() => {
    // Load Cashfree script dynamically
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.type = "text/javascript";

    document.body.appendChild(script);

    return () => {
      // Clean up
      document.body.removeChild(script);
    };
  }, []);

  // with test api
  // const handlePayment = (price, redirectUrl) => {
  //   const options = {
  //     key: "rzp_test_9laFgTaGBY10xm", // Your Key ID
  //     amount: price * 100, // Amount is in paise: 50000 paise = ₹500
  //     currency: "INR",
  //     name: "H2S Tech Solutions",
  //     description: "Course purchasing",
  //     image: logo, // optional

  //     handler: async function (response) {
  //       try {
  //         // Save to backend
  //         await FindUser.post(
  //           "/purchase-course/",
  //           {
  //             course_url: redirectUrl,
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${localStorage.getItem("access")}`,
  //             },
  //           }
  //         );

  //         // Redirect user
  //         window.location.href = redirectUrl;
  //       } catch (error) {
  //         console.error("Failed to save course:", error);
  //       }
  //     },

  //     prefill: {
  //       name: "Test User",
  //       email: "test@example.com",
  //       contact: "9999999999",
  //     },
  //     notes: {
  //       address: "Test Address",
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };

  return (
    <BrowserRouter>
      <Context.Provider
        value={{
          handlePayment: handlePayment,
          user: user,
          setUser: stableSetUser,
          enrolledCourses: enrolledCourses,
        }}
      >
        <NotificationPopup />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/course" element={<InternshipPrograms />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/htmlcss89" element={<HtmlCss />} />
          <Route path="/htmlcssjs62" element={<HtmlCssJs />} />
          <Route path="/python24" element={<Python />} />
          <Route path="/react79" element={<Reactjs />} />
          <Route path="/reactandjs43" element={<ReactandJs />} />
          {/* <Route path="/pythondjango90" element={<PythonDjango />} /> */}
          <Route path="/pythondjango90" element={<PyandDJ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment-status" element={<PaymentStatusPage />} />
        </Routes>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
{
  /* <Route path="/login" element={<LoginForm />} />
<Route path="/register" element={<RegisterForm />} /> */
}
