import Layout from '../components/layout/Layout';
import Search from '../components/layout/Search';

export default function Index({ jobs }) {  
  return (
    <Layout title='Search'>
      <Search/>
    </Layout>
  );
}

