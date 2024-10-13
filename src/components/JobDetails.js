import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function JobDetails() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [applied, setApplied] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            const response = await axios.get(`https://project-bn05.onrender.com/api/jobs/${id}`);
            setJob(response.data);
            setApplied(response.data.applied);
        };
        fetchJob();
    }, [id]);

    const handleApply = async () => {
        await axios.post(`https://project-bn05.onrender.com/api/jobs/${id}/apply`);
        setApplied(true);
    };

    return (
        <div className="container mt-4">
            {job ? (
                <div className="card">
                    <img src={job.imageUrl} className="card-img-top" alt={job.title} />
                    <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <p className="card-text">{job.description}</p>
                        <button className="btn btn-primary" onClick={handleApply} disabled={applied}>
                            {applied ? 'You have applied' : 'Apply'}
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading job details...</p>
            )}
        </div>
    );
}

export default JobDetails;
