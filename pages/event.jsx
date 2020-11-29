import Head from 'next/head';
import Layout from '../src/Components/Layout';
import Event from '../src/Components/Event';

export default () => (
  <div>
    <Head>
      <title>Event</title>
    </Head>

    <main>
      <Layout>
        <Event />
      </Layout>
    </main>
  </div>
);
