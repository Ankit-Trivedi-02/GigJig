import React, { useState } from 'react';
import './PostJob.css';

function PostJob() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="post-job-card">
      <button onClick={() => setShowForm(!showForm)} className="post-button">
        Post Job
      </button>
      <p>You can post jobs easily using this button.</p>
      {showForm && (
        <div className="job-form-placeholder">
          Form will appear here.
        </div>
      )}
    </div>
  );
}

export default PostJob;
