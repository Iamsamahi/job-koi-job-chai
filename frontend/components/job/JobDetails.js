import React from "react";
import moment from "moment";
import dynamic from 'next/dynamic';

const JobMap = dynamic(() => import('./JobMap'), { ssr: false });

const JobDetails = ({ job, candidates }) => {
  const isExpired = job.formatted_last_date ? new Date(job.formatted_last_date) < new Date() : false;

  // Validate job.point and coordinates
  const hasValidPoint =
    job.point &&
    job.point.coordinates &&
    Array.isArray(job.point.coordinates) &&
    job.point.coordinates.length === 2 &&
    job.point.coordinates.every(coord => typeof coord === 'number');

  return (
    <div className="job-details-wrapper">
      <div className="container container-fluid">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="job-details p-3">
              <div className="job-header p-4">
                <h2>{job.title}</h2>
                <span>
                  <i aria-hidden className="fas fa-building"></i>
                  <span> {job.company}</span>
                </span>
                <span className="ml-4">
                  <i aria-hidden className="fas fa-map-marker-alt"></i>
                  <span>{job.address || "Not specified"}</span>
                </span>

                <div className="mt-3">
                  <span>
                    <button className="btn btn-primary px-4 py-2 apply-btn">
                      Apply Now
                    </button>
                    <span className="ml-4 text-success">
                      <b>{candidates?.length || 0}</b> candidates have applied to this job.
                    </span>
                  </span>
                </div>
              </div>

              <div className="job-description mt-5">
                <h4>Description</h4>
                <p>{job.description}</p>
              </div>

              <div className="job-summary">
                <h4 className="mt-5 mb-4">Job Summary</h4>
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td>Job Type</td>
                      <td>:</td>
                      <td>{job.jobType}</td>
                    </tr>
                    <tr>
                      <td>Job Industry</td>
                      <td>:</td>
                      <td>{job.industry}</td>
                    </tr>
                    <tr>
                      <td>Expected Salary</td>
                      <td>:</td>
                      <td>{job.salary || "Not specified"}</td>
                    </tr>
                    <tr>
                      <td>Education</td>
                      <td>:</td>
                      <td>{job.education || "Not specified"}</td>
                    </tr>
                    <tr>
                      <td>Experience</td>
                      <td>:</td>
                      <td>{job.experience || "Not specified"}</td>
                    </tr>
                    <tr>
                      <td>Company</td>
                      <td>:</td>
                      <td>{job.company}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="job-location">
                <h4 className="mt-5 mb-4">Job Location</h4>
                {hasValidPoint ? (
                  <JobMap
                    coordinates={[job.point.coordinates[1], job.point.coordinates[0]]}
                    title={job.title}
                  />
                ) : (
                  <p>Map unavailable for this location.</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4">
            <div className="job-contact-details p-3">
              <h4 className="my-4">More Details</h4>
              <hr />
              <h5>Email Address:</h5>
              <p>{job.email || "Not specified"}</p>

              <h5>Job Posted:</h5>
              <p>{moment.utc(job.createdAt).local().startOf('seconds').fromNow()}</p>

              <h5>Last Date:</h5>
              <p>{job.formatted_last_date ? moment(job.formatted_last_date).format("DD-M-YYYY") : "Not specified"}</p>
            </div>

            <div className="mt-5 p-0">
              {isExpired && (
                <div className="alert alert-danger">
                  <h5>Note:</h5>
                  You can no longer apply to this job. This job is expired. Last
                  date to apply for this job was: <b>{job.formatted_last_date ? moment(job.formatted_last_date).format("DD-M-YYYY") : "Not specified"}</b>
                  <br /> Checkout others job on <br /> Job-Koi-Job-Chai Website.
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