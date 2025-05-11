import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { Context } from "./Context";
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
const API = axios.create({
  baseURL: "https://h2s-backend-urrt.onrender.com/api/auth/",
  withCredentials: true,
});

function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });

  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    try {
      const saved = localStorage.getItem("enrolledCourses");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing courses data:", error);
      return [];
    }
  });

  const stableSetUser = useCallback((newUser) => {
    setUser((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(newUser)) {
        return newUser;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const refreshToken = useCallback(async () => {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      try {
        const { data } = await API.post("jwt/refresh/", { refresh });
        localStorage.setItem("access", data.access);
      } catch (err) {
        console.log("Token refresh failed", err);
        stableSetUser(null);
      }
    }
  }, [stableSetUser]);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("access");
      if (!token) return;

      try {
        await API.post("jwt/verify/", { token });
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        const userId = tokenPayload.user_id;

        const response = await axios.get(
          `https://h2s-backend-urrt.onrender.com/api/user/${userId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        stableSetUser(response.data);
      } catch (error) {
        console.error("Error loading user:", error);
        localStorage.removeItem("access");
        stableSetUser(null);
      }
    };

    loadUser();
    const refreshInterval = setInterval(refreshToken, 5 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, [refreshToken, stableSetUser]);


  console.log(user?.username,'hai')
  const handlePayment = (price, redirectUrl) => {
    const options = {
      key: "rzp_test_9laFgTaGBY10xm", // Your Key ID
      amount: price * 100, // Amount is in paise: 50000 paise = ₹500
      currency: "INR",
      name: "Test Corp",
      description: "Test Transaction",
      image: "https://your-logo-url.com/logo.png", // optional

      handler: function (response) {
        const updatedCourses = [...enrolledCourses, redirectUrl];
        setEnrolledCourses(updatedCourses);

        // 2. localStorage में save करें (ताकि refresh पर भी ना खोए)
        localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));

        // 3. User को redirectUrl पर भेजें (आपका existing flow)
        window.location.replace(redirectUrl);
      },

      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Test Address",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const getUser = async () => {
      const res = await API.get("users/me/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      // console.log(res.data);
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <BrowserRouter>
      <Context.Provider
        value={{
          handlePayment: handlePayment,
          user: user,
          setUser: setUser,
          enrolledCourses: enrolledCourses,
        }}
      >
        <NotificationPopup />
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
          <Route path="/pythondjango90" element={<PythonDjango />} />
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
