import Head from 'next/head';
import Layout from '../src/Components/Layout';
import Profile from '../src/Components/Profile';

const AuthenticatedProfile = () => (
  <div>
    <Head>
      <title>Wigggle | Profile</title>
    </Head>

    <main>
      <Layout>
        <Profile />
      </Layout>
    </main>
  </div>
);

export default AuthenticatedProfile;
