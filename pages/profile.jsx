import Head from 'next/head';
import Layout from '../src/Components/Layout';
import Profile from '../src/Components/Profile';

export default () => (
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
