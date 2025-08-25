// EditJob.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditJob.css'; // optional

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/job/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
                setJob(response.data.job);
            } catch (error) {
                console.error('Error fetching job:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:3000/job/${id}`, job, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            alert("Job updated successfully!");
            navigate('/feed'); // Go back to job list
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!job) return <p>Job not found.</p>;

    return (
        <div className="edit-job-container">
            <h2>Edit Job</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input name="title" value={job.title} onChange={handleChange} required />
                </label>
                <label>
                    Specification:
                    <input name="specification" value={job.specification} onChange={handleChange} />
                </label>
                <label>
                    Category:
                    <input name="category" value={job.category} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={job.description} onChange={handleChange} />
                </label>
                <label>
                    Budget (pennies):
                    <input name="penny" value={job.penny} onChange={handleChange} type="number" />
                </label>
                <label>
                    Due Date:
                    <input name="dueDate" value={job.dueDate?.slice(0, 10)} type="date" onChange={handleChange} />
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditJob;
