import React from "react";

const JobDetails = ({ job, candidates = [] }) => {
  const isExpired = new Date(job.lastDate) < new Date(); // Check if the job is expired

  return (
    <div className="job-details-wrapper">
      <div className="container container-fluid">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-8">
            <div className="job-details">
              <div className="job-header">
                <h2>{job.title}</h2>
                <div className="job-info">
                  <span className="category">{job.industry}</span>
                  <span className="location">{job.location || "Not specified"}</span>
                  <button className="apply-btn">Apply Now</button>
                  <p className="candidates">
                    {candidates.length > 0
                      ? `${candidates.length} candidates have applied to this job.`
                      : "No candidates found for this job."}
                  </p>
                </div>
              </div>

              <div className="description">
                <h3>Description</h3>
                <p>{job.description}</p>
              </div>

              <div className="job-summary">
                <h3>Job Summary</h3>
                <p><strong>Job Type:</strong> {job.jobType}</p>
                <p><strong>Job Industry:</strong> {job.industry}</p>
                <p><strong>Expected Salary:</strong> {job.salary || "Not specified"}</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-4">
            <div className="job-contact-details">
              <h3>More Details</h3>
              <p><strong>Email Address:</strong> {job.email || "Not specified"}</p>
              <p><strong>Job Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
              <p><strong>Last Date:</strong> {job.lastDate || "Not specified"}</p>
              {isExpired && (
                <div className="note">
                  <strong>NOTE:</strong> You can no longer apply to this job. This job is expired. Last date to apply for this job was: {job.lastDate}.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;