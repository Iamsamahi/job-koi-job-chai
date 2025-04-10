import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';
import axios from 'axios';
import JobDetails from '../../components/job/JobDetails';

export default function JobDetailsPage({ job, candidates }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout>
        <div className="center-loader">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout>
        <h1>Job Not Found</h1>
        <p>The job you are looking for does not exist.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <JobDetails job={job} candidates={candidates} />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;

  if (!id || id === 'undefined') {
    return { notFound: true };
  }

  try {
    const res = await axios.get(`${process.env.API_URL}/api/jobs/${id}`);

    if (!res.data || !res.data.Job) {
      return { notFound: true };
    }

    // Safely serialize data to avoid undefined values
    const safeSerialize = (obj) =>
      JSON.parse(JSON.stringify(obj, (_, value) => (value === undefined ? null : value)));

    return {
      props: {
        job: safeSerialize(res.data.Job),
        candidates: safeSerialize(res.data.candidates || []),
      },
    };
  } catch (error) {
    console.error('Error fetching job details:', error.message);
    return { notFound: true };
  }
}