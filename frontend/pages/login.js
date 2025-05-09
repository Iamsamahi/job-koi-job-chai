import Layout from '../components/layout/Layout';
import Login from '../components/auth/Login';

export default function Index({ jobs }) {  
  return (
    <Layout title='Login'>
      <Login/>
    </Layout>
  );
}

