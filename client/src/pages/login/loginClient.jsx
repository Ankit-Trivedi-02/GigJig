import React, { useState } from 'react';
import './loginClient.css';
import {NavLink} from 'react-router-dom';

function LoginClient() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you'd usually send data to your backend API
    console.log('Login user:', formData);
  };

  return (
    <div className="login-container">
      <h2>Client Login</h2>
      <form onSubmit={handleSubmit} className="login-form">

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
      <p className="login-link">
        Dont have an account? <NavLink to={"/client/register"}>Register</NavLink>
      </p>
    </div>
  );
}

export default LoginClient;
