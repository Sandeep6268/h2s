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
      alert('Registration failed or enter strong password');
    }
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Register</h2>
      <form action="" className='d-flex flex-column gap-4 w-75 mx-auto'><input name="email" className='form-control' placeholder="Email" onChange={handleChange} />
      <input name="username" className='form-control' placeholder="Username" onChange={handleChange} />
      <input name="password" className='form-control' placeholder="Password" type="password" onChange={handleChange} />
      <button className='form-control bg-primary w-25 mx-auto' onClick={handleRegister}>Register</button></form>
      
    </div>
  );
};

export default Register;
