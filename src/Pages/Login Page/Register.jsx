import React, { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const sanitizedData = {
      ...data,
      username: data.username.replace(/\s/g, ""),
    };
    try {
      const res = await API.post('users/', sanitizedData);
      alert("User registered successfully");
      navigate("/login");
      // console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
      alert("Registration failed");
    }
  };

  return (
    <div className="container d-flex flex-column ">
      <h2 className="text-center">Register</h2>
      <input
        name="email"
        className="form-control my-2"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        name="username"
        className="form-control my-2"
        placeholder="Username"
        onChange={handleChange}
      />
      <small className="my-2">
        <span className="text-danger">Note:- </span>Don't use space in username
      </small>
      <input
        name="password"
        className="form-control my-2"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      />
      <small className="my-2">
        <span className="text-danger">Note:- </span>Password must contain '@ 1
        A' and it should be strong
      </small>
      <button
        className="form-control bg-primary w-25 mx-auto"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
