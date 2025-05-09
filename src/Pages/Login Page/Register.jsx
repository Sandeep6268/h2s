import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api";
import "./Register.css"; // Create this CSS file

const Register = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const sanitizedData = {
      ...data,
      username: data.username.replace(/\s/g, ""),
    };
    try {
      const res = await API.post('users/', sanitizedData);
      alert("User registered successfully");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
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
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          required
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
        />
        <small className="note-text">
          <span className="note-warning">Note: </span>
          Password must contain '@ 1 A' and it should be strong
        </small>

        <button type="submit">Register</button>

        <div className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;