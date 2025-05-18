import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({ 
    email: "", 
    username: "", 
    password: "",
    phone: "" 
  });
  const [errors, setErrors] = useState({
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

  // Validate individual field
  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email";
        }
        break;
        
      case "username":
        if (!value) {
          error = "Username is required";
        } else if (value.length < 4) {
          error = "Username must be at least 4 characters";
        } else if (/\s/.test(value)) {
          error = "Username cannot contain spaces";
        }
        break;
        
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters";
        } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(value)) {
          error = "Password must contain uppercase, lowercase, number, and special character";
        }
        break;
        
      case "phone":
        const digitsOnly = value.replace(/\D/g, "");
        if (!value) {
          error = "Phone number is required";
        } else if (digitsOnly.length !== 10) {
          error = "Phone number must be 10 digits";
        } else if (!/^[6-9]\d{9}$/.test(digitsOnly)) {
          error = "Please enter a valid Indian phone number";
        }
        break;
        
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For phone field, format as user types
    let formattedValue = value;
    if (name === "phone") {
      // Remove all non-digit characters first
      const digitsOnly = value.replace(/\D/g, "");
      
      // Format as XXX-XXX-XXXX
      if (digitsOnly.length <= 3) {
        formattedValue = digitsOnly;
      } else if (digitsOnly.length <= 6) {
        formattedValue = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
      } else {
        formattedValue = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
      }
    }
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: formattedValue 
    }));
    
    // Validate field and update errors
    const error = validateField(name, formattedValue);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      newErrors[key] = error;
      if (error) isValid = false;
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showCustomModal("error", "Please fix the errors in the form");
      return;
    }
    
    setIsLoading(true);
    
    const sanitizedData = {
      ...formData,
      username: formData.username.replace(/\s/g, ""),
      phone: formData.phone.replace(/\D/g, "") // Store only digits in backend
    };
    
    try {
      const response = await API.post('users/', sanitizedData);
      
      if (response.data && response.data.id) {
        showCustomModal("success", "Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data || err);
      
      let errorMsg = "Registration failed. Please try again.";
      const errorData = err.response?.data || {};
      
      // Handle different error cases
      if (errorData.email) {
        errorMsg = Array.isArray(errorData.email) 
          ? errorData.email.join(" ") 
          : "Email error: " + errorData.email;
      } else if (errorData.phone) {
        errorMsg = Array.isArray(errorData.phone) 
          ? "Phone error: " + errorData.phone.join(" ") 
          : "Phone error: " + errorData.phone;
      } else if (errorData.username) {
        errorMsg = Array.isArray(errorData.username) 
          ? "Username error: " + errorData.username.join(" ") 
          : "Username error: " + errorData.username;
      } else if (err.message) {
        errorMsg = err.message;
      }
      
      showCustomModal("error", errorMsg);
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
    <div className="register-container" data-aos='zoom-in'>
      {/* Loading Spinner */}
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader">
            <div className="face">
              <div className="circle"></div>
            </div>
            <div className="face">
              <div className="circle"></div>
            </div>
          </div>
          <p>Registering your account...</p>
        </div>
      )}

      {/* Success/Error Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            {modalType === "success" ? (
              <div className="success-box">
                <div className="animation-container">
                  <div className="dot"></div>
                  <div className="dot two"></div>
                  <div className="face">
                    <div className="eye"></div>
                    <div className="eye right"></div>
                    <div className="mouth happy"></div>
                  </div>
                  <div className="shadow scale"></div>
                </div>
                <div className="message">
                  <h1 className="alert">Success!</h1>
                  <p>{modalMessage}</p>
                </div>
                <button className="button-box" onClick={closeModal}>
                  <span className="green">Continue</span>
                </button>
              </div>
            ) : (
              <div className="error-box">
                <div className="animation-container">
                  <div className="dot"></div>
                  <div className="dot two"></div>
                  <div className="face2">
                    <div className="eye"></div>
                    <div className="eye right"></div>
                    <div className="mouth sad"></div>
                  </div>
                  <div className="shadow move"></div>
                </div>
                <div className="message">
                  <h1 className="alert">Error!</h1>
                  <p>{modalMessage}</p>
                </div>
                <button className="button-box" onClick={closeModal}>
                  <span className="red">Try Again</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="background">
        <div className="shape shape-first"></div>
        <div className="shape shape-last"></div>
      </div>
      
      <form onSubmit={handleRegister} className="register-form">
        <h3>Create Your Account</h3>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Choose a username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.username ? "error" : ""}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
          <small className="note-text">
            <span className="note-warning">Note: </span>
            Must be at least 4 characters with no spaces
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.password ? "error" : ""}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
          <small className="note-text">
            <span className="note-warning">Requires: </span>
            Minimum 8 characters with uppercase, lowercase, number, and special character
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Mobile Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter 10-digit mobile number"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength="12" // 3-3-4 format with dashes
            disabled={isLoading}
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
          <small className="note-text">
            <span className="note-warning">Format: </span>
            Indian numbers only (e.g., 987-654-3210)
          </small>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="register-button"
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Registering...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="login-redirect">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Sign in here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;