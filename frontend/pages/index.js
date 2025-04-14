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

export async function getServerSideProps(searchQuery) {

  const keyword = searchQuery.query.keyword || '';
  const location = searchQuery.query.location || '';

  const queryString = `keyword=${keyword}&location=${location}`;



  try {
    const res = await axios.get(`${process.env.API_URL}/api/jobs?${queryString}`);
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