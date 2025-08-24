import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./JobPostForm.css";

const JobPostForm = () => {
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
        navigate("/feed");
      } catch (err) {
        console.log({ error: "error" });
      }
    }
  };

  return (
    <div className="job-form-wrapper">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Post a Job</h2>

        <div className="input-group">
          <label>Title<span>*</span></label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="input-group">
          <label>Specification<span>*</span></label>
          <input
            type="text"
            name="specification"
            value={formData.specification}
            onChange={handleChange}
          />
          {errors.specification && <span className="error">{errors.specification}</span>}
        </div>

        <div className="input-group">
          <label>Category<span>*</span></label>
          <input
            type="text"
            name="categeory"
            value={formData.categeory}
            onChange={handleChange}
          />
          {errors.categeory && <span className="error">{errors.categeory}</span>}
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Penny<span>*</span></label>
          <input
            type="number"
            name="penny"
            value={formData.penny}
            onChange={handleChange}
          />
          {errors.penny && <span className="error">{errors.penny}</span>}
        </div>

        <div className="input-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default JobPostForm;
