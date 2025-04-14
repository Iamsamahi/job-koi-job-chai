
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import JobItem from './job/JobItem';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

const Home = ({ data }) => {
  const { jobs, count, resPerPage } = data;
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  let {keyword} = router.query;

  useEffect(() => {
    if (jobs) {
      setLoading(false);
    }
  }, [jobs]);

  return (
    <div className={styles.container}>
      <div className={styles.jobSection}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h4 className={styles.pageTitle}>
              {keyword
                ? `${jobs.length} Search results for ${keyword}`
                : 'Latest Jobs'}
              </h4>
            <div className={styles.searchWrapper}>
              <Link href="/search" className={styles.searchLink}>
                Go to Search
              </Link>
            </div>
          </div>
          <div className={styles.actions}>
            <Link href="/stats">
              <button className={styles.statsBtn}>Get Topic stats</button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="center-loader">
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : jobs && jobs.length > 0 ? (
          <div className={styles.jobList}>
            {jobs.map((job) => (
              <JobItem key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p>No jobs available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;