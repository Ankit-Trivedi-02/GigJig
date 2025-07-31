import React, { useState } from 'react';
import './RegisterClient.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterClient() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        role: 'client',
        location: {
            address: '',
            coordinates: ['', ''], // [longitude, latitude]
        },
        profile_image: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "longitude" || name === "latitude") {
            setFormData(prev => ({
                ...prev,
                location: {
                    ...prev.location,
                    coordinates: name === "longitude"
                        ? [value, prev.location.coordinates[1]]
                        : [prev.location.coordinates[0], value]
                }
            }));
        } else if (name === "address") {
            setFormData(prev => ({
                ...prev,
                location: {
                    ...prev.location,
                    address: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/auth/client/register", formData);
            if (response.status === 201) {
                navigate("/client/login")
            }
            else {

            }
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    return (
        <div className="page-view">
            <div className="register-container">
                <h2>Register</h2>
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
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.location.address}
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
