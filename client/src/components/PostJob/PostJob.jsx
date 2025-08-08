import React, { useState } from 'react';
import './PostJob.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios"

function PostJob() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    specification: '',
    categeory: '',
    description: '',
    penny: '',
    dueDate: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.specification) newErrors.specification = 'Specification is required';
    if (!formData.categeory) newErrors.categeory = 'Category is required';
    if (!formData.penny) newErrors.penny = 'Penny is required';
    else if (isNaN(formData.penny)) newErrors.penny = 'Penny must be a number';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.post("http://localhost:3000/job", formData, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        navigate("/");
      } catch (err) { console.log({ error: "error" }) }
      // You can send this to your backend here
    }
  };


  return (
    <div className="post-job-card">
      <button onClick={() => setShowForm(!showForm)} className="post-button">
        {showForm ? "Cancel" : "Post a Job"}
      </button>
      {showForm && (
        <form className="form-container" onSubmit={handleSubmit}>
          <h2>Job Description</h2>

          <label>Title*</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}

          <label>Specification*</label>
          <input
            type="text"
            name="specification"
            value={formData.specification}
            onChange={handleChange}
          />
          {errors.specification && <span className="error">{errors.specification}</span>}

          <label>Category*</label>
          <input
            type="text"
            name="categeory"
            value={formData.categeory}
            onChange={handleChange}
          />
          {errors.categeory && <span className="error">{errors.categeory}</span>}

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <label>Penny*</label>
          <input
            type="number"
            name="penny"
            value={formData.penny}
            onChange={handleChange}
          />
          {errors.penny && <span className="error">{errors.penny}</span>}

          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default PostJob;
