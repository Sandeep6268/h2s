import React, { useState, useEffect } from "react";
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

function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Load enrolled courses from localStorage on init
  const [user, setUser] = useState(null);

  // Load enrolled courses and user data on init
  useEffect(() => {
    // Load courses
    const savedCourses =
      JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolledCourses(savedCourses);

    // Load user if token exists
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        const userId = tokenPayload.user_id;

        // Fetch user data
        const fetchUser = async () => {
          try {
            const response = await axios.get(
              `https://h2s-backend-urrt.onrender.com/api/user/${userId}/`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setUser(response.data);
          } catch (error) {
            console.error("Error fetching user:", error);
            localStorage.removeItem("access");
          }
        };

        fetchUser();
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("access");
      }
    }
  }, []);

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
