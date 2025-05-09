import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api";
import "./Login.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    isSuccess: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("jwt/create/", data);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      showCustomModal("Success", "Login successful!", true);
      setTimeout(() => navigate("/"), 1500); // Redirect after 1.5 seconds
    } catch (err) {
      console.error(err.response?.data || err);
      showCustomModal(
        "Error",
        "Login failed. Please check your credentials.",
        false
      );
    }
  };

  const showCustomModal = (title, message, isSuccess) => {
    setModalContent({ title, message, isSuccess });
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000); // Auto-close after 3 seconds
  };

  return (
    <section className="container pt-5">
      {/* Beautiful Modal Popup */}
      {showModal && (
        <div className="modal-overlay">
          <div
            className={`modal-popup ${
              modalContent.isSuccess ? "success" : "error"
            }`}
          >
            <div className="modal-header">
              <h3>{modalContent.title}</h3>
              <button onClick={() => setShowModal(false)} className="close-btn">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>{modalContent.message}</p>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setShowModal(false)}
                className={`modal-btn ${
                  modalContent.isSuccess ? "btn-success" : "btn-error"
                }`}
              >
                OK
              </button>
            </div>
          </div>
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
            <button type="submit" className="opacity">
              SUBMIT
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
