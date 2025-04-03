import Layout from '../components/layout/Layout';
import Home from '../components/Home';
import axios from 'axios';

export default function Index({ jobs }) {  
  return (
    <Layout>
      <Home data = {jobs}/>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const res = await axios.get(`${process.env.API_URL}/api/jobs/`);  // Changed 'job' to 'jobs'
    const data = res.data;
    return {
      props: {
        jobs: data,  // Consistent prop name
      },
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return {
      props: {
        jobs: [],  // Fallback in case of error
      },
    };
  }
}