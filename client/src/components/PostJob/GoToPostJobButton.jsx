import React from "react";
import { useNavigate } from "react-router-dom";
import "./GoToPostJobButton.css";

const GoToPostJobButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/post-job");
  };

  return (
    <div className="go-to-job-wrapper">
      <button className="go-to-job-btn" onClick={handleClick}>
        + Post a Job
      </button>
    </div>
  );
};

export default GoToPostJobButton;
