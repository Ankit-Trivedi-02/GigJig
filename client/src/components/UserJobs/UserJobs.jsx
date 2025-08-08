import React, { useEffect, useState } from 'react';
import './UserJobs.css';
import axios from 'axios';

const UserJobs = () => {
    const [userJobs, setUserJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch jobs from the backend
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/job", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                const allJobs = response.data.job || [];
                setUserJobs(allJobs);
            } catch (err) {
                console.log({ error: "error" })
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="user-jobs-container">
            <h2>Your Posted Jobs</h2>

            {loading ? (
                <p>Loading...</p>
            ) : userJobs.length === 0 ? (
                <p>No jobs posted yet.</p>
            ) : (
                userJobs.map(job => (
                    <div key={job._id} className="job-card">
                        <h3>{job.title}</h3>
                        <p><strong>Specification:</strong> {job.specification}</p>
                        <p><strong>Category:</strong> {job.categeory}</p>
                        {job.description && <p><strong>Description:</strong> {job.description}</p>}
                        <p><strong>Budget:</strong> {job.penny} pennies</p>
                        {job.dueDate && job.dueDate !== '0002-02-22T00:00:00.000Z' && (
                            <p><strong>Due Date:</strong> {new Date(job.dueDate).toLocaleDateString()}</p>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default UserJobs;
