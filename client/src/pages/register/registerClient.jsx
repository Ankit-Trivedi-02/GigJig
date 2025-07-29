import React, { useState } from 'react';
import './RegisterClient.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios'

function RegisterClient() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: "partner"
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you'd usually send data to your backend API
        const response = await axios.post("http://localhost:3000/user/register", formData);
        console.log(response);
    };

    return (
        <div className="page-view">
            <div className="register-container">
                <h2>Client Register</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

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

                    <button type="submit">Register</button>
                </form>
                <p className="register-link">
                    Already have an account? <NavLink to={"/client/login"}>Login</NavLink>
                </p>
            </div>
        </div>
    );
}

export default RegisterClient;
