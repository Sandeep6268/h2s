import React, { useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({ email: '', username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const error = undefined
  const handleRegister = async () => {
    try {
      const res = await API.post('users/', data);
      alert('User registered successfully');
      navigate('/login')
      // console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
      alert('Registration failed');
      error = 'Password is too simple'
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {{error}}
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
