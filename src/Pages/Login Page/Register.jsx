import React, { useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({ email: '', username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  
  const handleRegister = async () => {
    try {
      const res = await API.post('users/', data);
      alert('User registered successfully');
      navigate('/login')
      // console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
      alert('Registration failed');
    }
  };

  return (
    <div className='container'>
      <h2>Register</h2>
      <form action=""><input name="email" className='form-control' placeholder="Email" onChange={handleChange} />
      <input name="username" className='form-control' placeholder="Username" onChange={handleChange} />
      <input name="password" className='form-control' placeholder="Password" type="password" onChange={handleChange} />
      <button className='form-control' onClick={handleRegister}>Register</button></form>
      
    </div>
  );
};

export default Register;
