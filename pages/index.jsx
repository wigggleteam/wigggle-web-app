import Head from 'next/head';
import Layout from '../src/Components/Layout';
import Home from '../src/Components/Home';

export default () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>

    <main>
      <Layout>
        <Home />
      </Layout>
    </main>
  </div>
);
