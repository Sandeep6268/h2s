import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API, { FindUser } from "../../api";
import "./Register.css";

const Register = () => {
  const [data, setData] = useState({ 
    email: "", 
    username: "", 
    password: "",
    phone: "" 
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const sanitizedData = {
      ...data,
      username: data.username.replace(/\s/g, ""),
      phone: data.phone.replace(/\D/g, "") // Remove non-digit characters from phone
    };
    
    try {
      const res = await API.post('users/', sanitizedData);

      await FindUser.post('send-welcome-email/', {
      email: sanitizedData.email,
      username: sanitizedData.username
    });
      setIsLoading(false);
      showCustomModal("success", "Registration successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err.response?.data || err);
      setIsLoading(false);
      let errorMsg = "Registration failed. Please try again and use strong password";
      
      if (err.response?.data) {
        if (err.response.data.email?.[0]?.includes("already exists")) {
          errorMsg = "Email already registered";
        } else if (err.response.data.phone?.[0]?.includes("already exists")) {
          errorMsg = "Phone number already registered";
        }
      }
      
      showCustomModal("error", errorMsg);
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
    <div className="register-container" data-aos='zoom-in'>
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

      <div className="background">
        <div className="shape shape-first"></div>
        <div className="shape shape-last"></div>
      </div>
      <form onSubmit={handleRegister}>
        <h3>Register Here</h3>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          required
          disabled={isLoading}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <small className="note-text">
          <span className="note-warning">Note: </span>Don't use spaces in username
        </small>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <small className="note-text">
          <span className="note-warning">Note: </span>
          Password must contain '@ 1 A' and it should be strong
        </small>

        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          id="phone"
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <small className="note-text">
          <span className="note-warning">Note: </span>
          Please enter a valid 10-digit phone number
        </small>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "REGISTERING..." : "REGISTER"}
        </button>

        <div className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;