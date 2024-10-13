import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axios.get('https://project-bn05.onrender.com/api/jobs');
      setJobs(response.data);
    };

    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('You need to be logged in to apply for a job.');
      return;
    }

    await axios.post(`https://project-bn05.onrender.com/api/jobs/${jobId}/apply`, { userId });
    alert('Applied successfully!');
    window.location.reload(); // Refresh to see updated applied status
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Jobs</h2>
      <div className="row">
        {jobs.map((job) => (
          <div className="col-md-4 mb-4" key={job._id}>
            <div className="card border-primary ">
              <img src={job.imageUrl} className="card-img-top" alt={job.title} height={300} width={200} />
              <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <p className="card-text">{job.description}</p>
                <p className="card-text"><strong>Company:</strong> {job.company}</p>
                <p className="card-text"><strong>Location:</strong> {job.location}</p>
                <button className="btn btn-primary" onClick={() => handleApply(job._id)}>Apply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
