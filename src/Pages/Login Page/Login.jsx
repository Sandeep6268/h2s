import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api"; // Import the function instead of FindUser
// Header.js
import { fetchUserData } from "../../api"; // Adjust path as needed
import "./Login.css";
import { Context } from "../../Context";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const { setUser } = useContext(Context);
  const [data, setData] = useState({ email: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Login with existing API
      const { data: tokens } = await API.post("jwt/create/", {
        email: data.email,
        password: data.password,
      });

      // 2. Save tokens
      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);

      // 3. Get basic info from token
      const decoded = jwtDecode(tokens.access);
      const minimalUser = {
        id: decoded.user_id,
        username: decoded.username || "",
        email: decoded.email || "",
      };
      setUser(minimalUser);

      // 4. Fetch full user data (non-blocking)
      fetchUserData(decoded.user_id)
        .then((fullData) => {
          setUser((prev) => ({ ...prev, ...fullData }));
        })
        .catch((err) => {
          console.log("Using minimal user data", err);
        });

      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      // Handle error
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

      {/* Success/Error Modal */}
      {showModal && (
        <div id="modal-container">
          {modalType === "success" ? (
            <div id="success-box">
              <div className="dot"></div>
              <div className="dot two"></div>
              <div className="face">
                <div className="eye"></div>
                <div className="eye right"></div>
                <div className="mouth happy"></div>
              </div>
              <div className="shadow scale"></div>
              <div className="message">
                <h1 className="alert">Success!</h1>
                <p>{modalMessage}</p>
              </div>
              <button className="button-box" onClick={closeModal}>
                <p className="green">continue</p>
              </button>
            </div>
          ) : (
            <div id="error-box">
              <div className="dot"></div>
              <div className="dot two"></div>
              <div className="face2">
                <div className="eye"></div>
                <div className="eye right"></div>
                <div className="mouth sad"></div>
              </div>
              <div className="shadow move"></div>
              <div className="message">
                <h1 className="alert">Error!</h1>
                <p>{modalMessage}</p>
              </div>
              <button className="button-box" onClick={closeModal}>
                <p className="red">try again</p>
              </button>
            </div>
          )}
        </div>
      )}

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
    </section>
  );
};

export default Login;
