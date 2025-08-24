import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/feed');
  };

  return (
    <div className="not-found-container">
      <h2 className="not-found-heading">Are you looking for this route?</h2>

      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZw8MebiZJdoBpKFBeLfV3v8QafbhVkEkbA&s"
        alt="Not Found"
        className="not-found-image"
      />

      <p className="not-found-text">Sorry, you need to go to the Feed page.</p>

      <button className="redirect-button" onClick={handleRedirect}>
        Redirect to Feed
      </button>
    </div>
  );
};

export default NotFoundPage;
