import React, { useState } from 'react';
import './loginClient.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginClient() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3000/auth/client/login", formData)
      console.log(result);
      if (result.status === 200) {
        navigate("/feed");
      }
    } catch (err) { console.log(err) }

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
