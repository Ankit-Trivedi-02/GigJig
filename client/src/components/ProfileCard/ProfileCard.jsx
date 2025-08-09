import React from 'react';
import './ProfileCard.css';

function ProfileCard({ onClick }) {  // <-- accept onClick here
  return (
    <div
      className="profile-card"
      onClick={onClick}             // <-- use it here
      style={{ cursor: 'pointer' }}
    >
      <div className="profile-details">
        <img
          className="profile-img"
          src="https://i.pinimg.com/originals/c4/cb/37/c4cb37fb08aaf5c474b66f0d6fa146ce.jpg" alt="Profile"
        />
        <div>
          <h2>John Doe</h2>
          <p>New York, USA</p>
        </div>
      </div>
      <div className="contact-info">
        <p>Email: john@example.com</p>
        <p>Phone: +1 234 567 890</p>
      </div>
    </div>
  );
}

export default ProfileCard;
