import React, { useState } from 'react';
import API from '../../api';

const Register = () => {
  const [data, setData] = useState({ email: '', username: '', password: '' });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await API.post('users/', data);
      alert('User registered successfully');
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
