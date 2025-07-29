import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">MyApp</div>
            <ul className="navbar-icons">
                <li className="icon">
                    <span className="icon-img">📩</span>
                    <span className="tooltip">Messages</span>
                </li>
                <li className="icon">
                    <span className="icon-img">🔔</span>
                    <span className="tooltip">Notifications</span>
                </li>
                <li className="icon">
                    <span className="icon-img">💼</span>
                    <span className="tooltip">Jobs</span>
                </li>
            </ul>
            <div className="premium-badge">Try Premium</div>
        </nav>
    );
}

export default Navbar;
