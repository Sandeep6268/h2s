import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api";
import "./Login.css";
import { Context } from "../../Context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import EmotionAnimation from "../../Component/Animation/EmotionAnimation";

const Login = () => {
  const { setUser } = useContext(Context);
  const [data, setData] = useState({ email: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Clear existing tokens
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      const { data: tokens } = await API.post("jwt/create/", {
        email: data.email,
        password: data.password,
      });

      // Save tokens first
      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);

      // Verify the token immediately
      try {
        await API.post("jwt/verify/", { token: tokens.access });

        const decoded = jwtDecode(tokens.access);
        const userResponse = await axios.get(
          `https://h2s-backend-urrt.onrender.com/api/user/${decoded.user_id}/`,
          { headers: { Authorization: `Bearer ${tokens.access}` } }
        );

        // Update context
        setUser(userResponse.data);

        // Show success animation
        setShowSuccessAnimation(true);

        // After 2 seconds, redirect to home
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (verifyError) {
        console.error("Token verification failed:", verifyError);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        showCustomModal("error", "Login failed. Please try again.");
        throw verifyError;
      }
    } catch (err) {
      console.error("Login failed:", err);
      showCustomModal("error", "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const showCustomModal = (type, message) => {
    setModalType(type);
    setModalMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="container pt-5">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="loader-container">
          <div className="loader">
            <div className="face">
              <div className="circle"></div>
            </div>
            <div className="face">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      )}

      {/* Success Animation (shown after successful login) */}
      {showSuccessAnimation && (
        <div className="success-animation-container">
          <EmotionAnimation type="success" />
          <div className="message">
            <h1 className="alert">Login Successful!</h1>
            <p>Redirecting to home page...</p>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showModal && (
        <div id="modal-container">
          <div id="error-box">
            <EmotionAnimation type="error" />
            <div className="message">
              <h1 className="alert">Error!</h1>
              <p>{modalMessage}</p>
            </div>
            <button className="button-box" onClick={closeModal}>
              <p className="red">try again</p>
            </button>
          </div>
        </div>
      )}

      {/* Login Form (hidden after successful login) */}
      {!showSuccessAnimation && (
        <div className="login-container mx-auto">
          <div className="circle circle-one"></div>
          <div className="form-container">
            <img
              src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
              alt="illustration"
              className="illustration"
            />
            <h1 className="opacity">LOGIN</h1>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                onChange={handleChange}
                value={data.email}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="PASSWORD"
                onChange={handleChange}
                value={data.password}
                required
              />
              <button type="submit" className="opacity" disabled={isLoading}>
                {isLoading ? "PROCESSING..." : "SUBMIT"}
              </button>
            </form>
            <div className="register-forget opacity">
              <Link to="/register" className="text-decoration-none text-danger">
                Don't have an account?
              </Link>
            </div>
          </div>
          <div className="circle circle-two"></div>
        </div>
      )}
    </section>
  );
};

export default Login;
