import React, { useState } from "react";
import "./App.css";
import { Context } from "./Context";
import Home from "./Pages/Home Page/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HtmlCssJs from "./Component/Courses/Courses Page/HTML CSS JS/HtmlCssJs";
import PythonDjango from "./Component/Courses/Courses Page/PYTHON AND DJANGO/PythonDjango";
import Reactjs from "./Component/Courses/Courses Page/REACT/Reactjs";
import Python from "./Component/Courses/Courses Page/Python/Python";
import PlayVideo from "./Component/Youtube/Youtube";
import NotificationPopup from "./Component/Notification/NotificationPopup";
import HtmlCss from "./Component/Courses/Courses Page/HTML CSS/HtmlCss";
import ReactandJs from "./Component/Courses/Courses Page/REACT AND JS/ReactandJs";
import Contact from "./Pages/Contact Page/Contact";
import LoginForm from "./Pages/Login Page/Login";
import RegisterForm from "./Pages/Login Page/Register";
import Login from "./Pages/Login Page/Login";
import Register from "./Pages/Login Page/Register";

function App() {
  const handlePayment = (price, redirectUrl) => {
    const options = {
      key: "rzp_test_9laFgTaGBY10xm", // Your Key ID
      amount: price * 100, // Amount is in paise: 50000 paise = ₹500
      currency: "INR",
      name: "Test Corp",
      description: "Test Transaction",
      image: "https://your-logo-url.com/logo.png", // optional

      handler: function (response) {
        // console.log("Payment Success:", response.razorpay_payment_id);
        // Redirect to dynamic page
        window.location.replace(`${redirectUrl}`);
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
  const [user, setUser] = useState(null); 
  console.log(user)
  return (
    <BrowserRouter>
      <Context.Provider value={{ handlePayment: handlePayment,user:user,setUser:setUser }}>
        <NotificationPopup />
        <Routes>
          <Route path="/" element={<Home />} />

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
