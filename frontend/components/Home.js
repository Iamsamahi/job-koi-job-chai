import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import JobItem from './job/JobItem';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import Filters from './layout/Filter';

const Home = ({ data }) => {
  const { jobs, count, resPerPage } = data;
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  let { page = 1, keyword } = router.query;
  page = Number(page);

  useEffect(() => {
    if (jobs) {
      setLoading(false);
    }
  }, [jobs]);

  let queryParams;
  if (typeof window !== 'undefined') {
    queryParams = new URLSearchParams(window.location.search);
  }

  const handlePageChange = ({ selected }) => {
    const currentPage = selected + 1;

    if (queryParams.has('page')) {
      queryParams.set('page', currentPage);
    } else {
      queryParams.append('page', currentPage);
    }

    router.push({
      pathname: router.pathname,
      query: Object.fromEntries(queryParams.entries()),
    });
  };

  const totalPages = Math.ceil(count / resPerPage);
  console.log({ count, resPerPage, totalPages, page }); // Debug log

  return (
    <div className={styles.container}>
      <div className={styles.mainLayout}>
        {/* Add Filters on the left */}
        <div className={styles.filters}>
          <Filters />
        </div>

        {/* Job listings in the middle */}
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

              {resPerPage < count && totalPages > 1 && (
                <div className={styles.pagination}>
                  <ReactPaginate
                    pageCount={totalPages}
                    initialPage={page - 1}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageChange}
                    containerClassName="pagination"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    activeClassName="active"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    firstClassName="page-item"
                    firstLinkClassName="page-link"
                    lastClassName="page-item"
                    lastLinkClassName="page-link"
                    previousLabel="Prev"
                    nextLabel="Next"
                    firstLabel="First"
                    lastLabel="Last"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    disableInitialCallback={false}
                  />
                </div>
              )}
            </div>
          ) : (
            <p>No jobs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;