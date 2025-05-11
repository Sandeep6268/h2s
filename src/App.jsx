import React, { useState, useEffect } from "react";
import "./App.css";
import { Context } from "./Context";
import Home from "./Pages/Home Page/Home";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
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
import { jwtDecode } from "jwt-decode";
import API from "./Api"; // Make sure this is properly configured

function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load enrolled courses and check user authentication on init
  useEffect(() => {
    // 1. Load enrolled courses
    const savedCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolledCourses(savedCourses);

    // 2. Check if user is authenticated
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          setUser(null);
        } else {
          // Fetch complete user data if needed
          fetchUserData(token);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await API.get("users/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      // If token is invalid, clear it
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setUser(null);
    }
  };

  const handlePayment = (price, redirectUrl) => {
    const options = {
      key: "rzp_test_9laFgTaGBY10xm",
      amount: price * 100,
      currency: "INR",
      name: "Test Corp",
      description: "Test Transaction",
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        const updatedCourses = [...enrolledCourses, redirectUrl];
        setEnrolledCourses(updatedCourses);
        localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));
        window.location.replace(redirectUrl);
      },
      prefill: {
        name: user?.username || "Test User",
        email: user?.email || "test@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Test Address",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleLogin = (token) => {
    localStorage.setItem("access", token.access);
    localStorage.setItem("refresh", token.refresh);
    const decoded = jwtDecode(token.access);
    setUser(decoded);
    // Optionally fetch complete user data
    fetchUserData(token.access);
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  return (
    <BrowserRouter>
      <Context.Provider
        value={{
          handlePayment,
          user,
          setUser,
          enrolledCourses,
          handleLogin,
          handleLogout,
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
          <Route 
            path="/login" 
            element={<Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/register" 
            element={<Register onRegister={handleLogin} />} 
          />
        </Routes>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;