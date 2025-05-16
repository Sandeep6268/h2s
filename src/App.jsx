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
    const user = JSON.parse(localStorage.getItem("user")) || {};

    const orderId = "order_" + Math.random().toString(36).substring(2, 12);

    try {
      // Step 1: Create order and get paymentSessionId from Cashfree (TEST MODE)
      const res = await fetch("https://sandbox.cashfree.com/pg/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2022-09-01",
          "x-client-id": "TEST1234567890", // 🔁 Your test client ID here
          "x-client-secret": "TEST9876543210", // 🔁 Your test secret key here
        },
        body: JSON.stringify({
          order_id: orderId,
          order_amount: price,
          order_currency: "INR",
          customer_details: {
            customer_id: user?.id || "guest_123",
            customer_email: user?.email || "test@example.com",
            customer_phone: user?.phone || "9999999999",
            customer_name: user?.name || "Guest User",
          },
        }),
      });

      const data = await res.json();
      const sessionId = data.payment_session_id;

      if (!sessionId) {
        alert("Failed to create payment session");
        return;
      }

      // Step 2: Load Cashfree SDK and start Drop-in flow
      const cashfree = await import(
        "https://sdk.cashfree.com/js/ui/2.0.0/dropin.min.js"
      );
      cashfree.initializeDropin({
        paymentSessionId: sessionId,
        redirectTarget: "_self", // or "_blank"
        returnUrl: window.location.href, // optional for success redirect
      });

      // Optional: You can also listen for Drop-in events here
    } catch (error) {
      console.error("Cashfree error:", error);
      alert("Something went wrong during payment");
    }
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
  // useEffect(() => {
  //   // Load Cashfree script dynamically
  //   const script = document.createElement("script");
  //   script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
  //   script.async = true;
  //   script.type = "text/javascript";

  //   document.body.appendChild(script);

  //   return () => {
  //     // Clean up
  //     document.body.removeChild(script);
  //   };
  // }, []);

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
