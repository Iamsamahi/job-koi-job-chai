import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import Home from '../components/Home';
import axios from 'axios';

export default function Index({ initialData }) {
  const router = useRouter();
  const [data, setData] = useState(initialData); // Initialize with server-side data
  const [isLoading, setIsLoading] = useState(false);
  const fetchTimeoutRef = useRef(null); // For debouncing

  // Function to fetch jobs based on query parameters
  const fetchJobs = async (query) => {
    const {
      jobType = '',
      education = '',
      experience = '',
      keyword = '',
      location = '',
      page = 1,
      salary = '',
    } = query;

    let min_salary = '';
    let max_salary = '';

    if (salary) {
      [min_salary, max_salary] = salary.split('-');
    }

    const queryString = `keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}&page=${page}&jobType=${encodeURIComponent(jobType)}&education=${encodeURIComponent(education)}&experience=${encodeURIComponent(experience)}&min_salary=${min_salary}&max_salary=${max_salary}`;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    if (!apiUrl) {
      console.error('NEXT_PUBLIC_API_URL is not defined');
      setData(initialData);
      setIsLoading(false);
      return;
    }

    const fullUrl = `${apiUrl}/api/jobs?${queryString}`;


    try {
      setIsLoading(true);
      const res = await axios.get(fullUrl);
      console.log('Client-side API Response:', res.data);
      if (res.data && Array.isArray(res.data.jobs)) {
        setData(res.data); // Update only with valid data
      } else {
        console.warn('Invalid API response format, preserving initial data');
        setData(initialData);
      }
    } catch (error) {
      console.error('Client-side error fetching jobs:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      setData(initialData); // Preserve initial data
    } finally {
      setIsLoading(false);
    }
  };

  // Re-fetch jobs when query parameters change
  useEffect(() => {
    if (!router.isReady) return;

    const queryString = JSON.stringify(router.query); // Stabilize dependency
    console.log('Query changed:', router.query);

    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current); // Cancel previous fetch
    }

    fetchTimeoutRef.current = setTimeout(() => {
      fetchJobs(router.query);
    }, 300); // Debounce for 300ms

    return () => clearTimeout(fetchTimeoutRef.current); // Cleanup
  }, [JSON.stringify(router.query), router.isReady]); // Use stringified query

  return (
    <Layout>
      <Home data={data} isLoading={isLoading} />
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const jobType = query.jobType || '';
  const education = query.education || '';
  const experience = query.experience || '';
  const keyword = query.keyword || '';
  const location = query.location || '';
  const page = query.page || 1;
  const salary = query.salary || '';

  let min_salary = '';
  let max_salary = '';

  if (salary) {
    [min_salary, max_salary] = salary.split('-');
  }

  const queryString = `keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}&page=${page}&jobType=${encodeURIComponent(jobType)}&education=${encodeURIComponent(education)}&experience=${encodeURIComponent(experience)}&min_salary=${min_salary}&max_salary=${max_salary}`;

  const apiUrl = process.env.API_URL || 'http://localhost:8000';
  console.log('Server-side fetching URL:', `${apiUrl}/api/jobs?${queryString}`);

  try {
    const res = await axios.get(`${apiUrl}/api/jobs?${queryString}`);
    console.log('Server-side API Response:', res.data);
    return {
      props: {
        initialData: res.data,
      },
    };
  } catch (error) {
    console.error('Server-side error fetching jobs:', error.message);
    return {
      props: {
        initialData: { jobs: [], count: 0, resPerPage: 0 },
      },
    };
  }
}