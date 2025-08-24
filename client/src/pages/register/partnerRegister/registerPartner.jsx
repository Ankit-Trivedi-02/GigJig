import React, { useState } from 'react';
import './RegisterPartner.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPartner() {

    const [formData, setFormData] = useState({
        name: {
            firstName: '',
            lastName: ''
        },
        username: '',
        email: '',
        password: '',
        phone: '',
        role: 'partner',
        location: {
            country: '',
            state: '',
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
        } else if (name === "country") {
            setFormData(prev => ({
                ...prev,
                location: {
                    ...prev.location,
                    country: value
                }
            }));
        } else if (name === "state") {
            setFormData(prev => ({
                ...prev,
                location: {
                    ...prev.location,
                    state: value
                }
            }));
        }
        else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        const { password, phone, location } = formData;

        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

        if (location.address.length < 10) {
            alert("Address must be at least 10 characters long.");
            return;
        }
        e.preventDefault();
        try {
            if (formData.password.length < 8) {
                return;
            }
            const response = await axios.post("http://localhost:3000/auth/client/register", formData);
            if (response.status === 201) {
                navigate("/partner/login")
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
                        minLength={8}
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="Number"
                        name="phone"
                        placeholder="Phone"
                        pattern="\d{10}"
                        title="Phone number must be exactly 10 digits"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="country"
                        placeholder="country"
                        value={formData.location.country}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="state"
                        value={formData.location.state}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        minLength={10}
                        value={formData.location.address}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
                <p className="register-link">
                    Already have an account? <NavLink to={"/partner/login"}>Login</NavLink>
                </p>
            </div>
        </div>
    );
}

export default RegisterPartner;
