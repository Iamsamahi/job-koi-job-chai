// pages/profile.js
import Layout from '../../components/layout/Layout';
import UpdateProfile from '../../components/user/UpdateProfile';
import { isAuthenticatedUser } from '../../utils/isAuthenticated';

export default function UpdateProfilePage({ access_token }) {
  return (
    <Layout title="Update Profile">
      <UpdateProfile access_token={access_token} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const access_token = req.cookies.access;
  console.log('Profile getServerSideProps: access_token=', access_token);

  if (!access_token) {
    console.log('No access token found in cookies, redirecting to login');
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const user = await isAuthenticatedUser(access_token);
  console.log('Profile getServerSideProps: isAuthenticatedUser result=', user);

  if (!user) {
    console.log('User not authenticated, redirecting to login');
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { access_token },
  };
}