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
import "aos/dist/aos.css";
import { Cashfree } from "@cashfreepayments/cashfree-sdk";
import { useLocation } from "react-router-dom";

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
      duration: 800,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState({
    show: false,
    status: null, // 'verifying', 'success', 'failed'
    orderId: null,
    paymentId: null,
    redirectUrl: null,
    error: null,
  });

  // Auth initialization and token refresh logic remains the same...

  const handlePayment = async (price, redirectUrl) => {
    try {
      const token = localStorage.getItem("access");
      if (!token) {
        alert("Please login first.");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));
      const phone = user?.phone || "9999999999";

      const orderResponse = await FindUser.post(
        "/create-cashfree-order/",
        {
          amount: price,
          course_url: redirectUrl,
          phone: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { orderId, paymentSessionId } = orderResponse.data;

      if (!window.Cashfree) {
        throw new Error("Cashfree SDK not loaded. Please refresh the page.");
      }

      const cashfree = new window.Cashfree({ mode: "production" });

      return new Promise((resolve, reject) => {
        let paymentCompleted = false;

        const checkoutOptions = {
          paymentSessionId,
          redirectTarget: "_blank",

          onSuccess: async (data) => {
            try {
              paymentCompleted = true;
              setPaymentStatus({
                show: true,
                status: 'verifying',
                orderId,
                paymentId: data.paymentId,
                redirectUrl,
                error: null
              });
              resolve(true);
            } catch (err) {
              console.error("Payment success handler error:", err);
              reject(err);
            }
          },

          onFailure: (data) => {
            paymentCompleted = false;
            reject(new Error(data?.message || "Payment failed"));
          },

          onClose: () => {
            if (!paymentCompleted) {
              reject(new Error("Payment window closed without completion"));
            }
          },
        };

        cashfree.checkout(checkoutOptions);
      });
    } catch (error) {
      console.error("Payment initialization error:", error);
      let message = "Payment failed. Please try again.";
      if (error.response?.status === 401) {
        message = "Session expired. Please login again.";
        localStorage.removeItem("access");
        window.location.reload();
      } else if (error.response?.data?.error) {
        message += ` (${error.response.data.error})`;
      }
      throw new Error(message);
    }
  };

  // Verify payment when status modal is shown
  useEffect(() => {
    if (paymentStatus.show && paymentStatus.status === 'verifying') {
      const verifyPayment = async () => {
        try {
          const token = localStorage.getItem("access");
          
          await FindUser.post(
            "/verify-payment/",
            { 
              orderId: paymentStatus.orderId, 
              paymentId: paymentStatus.paymentId 
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          await FindUser.post(
            "/purchase-course/",
            {
              course_url: paymentStatus.redirectUrl,
              payment_id: paymentStatus.paymentId,
              order_id: paymentStatus.orderId,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const coursesResponse = await FindUser.get("/my-courses/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEnrolledCourses(coursesResponse.data);

          setPaymentStatus(prev => ({
            ...prev,
            status: 'success'
          }));

          setTimeout(() => {
            window.location.href = `${paymentStatus.redirectUrl}?payment_id=${paymentStatus.paymentId}`;
          }, 2000);
          
        } catch (err) {
          console.error("Payment verification failed:", err);
          setPaymentStatus(prev => ({
            ...prev,
            status: 'failed',
            error: err.message
          }));
        }
      };

      verifyPayment();
    }
  }, [paymentStatus.show, paymentStatus.status]);

  const closePaymentStatus = () => {
    setPaymentStatus({
      show: false,
      status: null,
      orderId: null,
      paymentId: null,
      redirectUrl: null,
      error: null
    });
  };

  // Payment Status Modal component
  const PaymentStatusModal = () => {
    if (!paymentStatus.show) return null;

    return (
      <div className="payment-status-modal" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          textAlign: 'center',
          maxWidth: '500px',
          width: '90%'
        }}>
          {paymentStatus.status === 'verifying' && (
            <div>
              <h3>Verifying Payment...</h3>
              <p>Please wait while we verify your payment details.</p>
              <div className="spinner"></div>
            </div>
          )}
          
          {paymentStatus.status === 'success' && (
            <div>
              <h3 style={{color: 'green'}}>Payment Successful!</h3>
              <p>You will be redirected to your course shortly.</p>
            </div>
          )}
          
          {paymentStatus.status === 'failed' && (
            <div>
              <h3 style={{color: 'red'}}>Payment Verification Failed</h3>
              <p>{paymentStatus.error || 'Unknown error occurred'}</p>
              <button 
                onClick={closePaymentStatus}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#3399cc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Context.Provider
        value={{
          handlePayment: handlePayment,
          user: user,
          setUser: stableSetUser,
          enrolledCourses,
          setEnrolledCourses
        }}
      >
        <NotificationPopup />
        <ScrollToTop />
        <PaymentStatusModal />
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
          <Route path="/pythondjango90" element={<PyandDJ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;