import Head from 'next/head';
import Layout from '../../src/Components/Layout';
import Admin from '../../src/Components/Admin';

const EventPage = () => (
  <div>
    <Head>
      <title>Admin Area</title>
    </Head>

    <main>
      <Layout>
        <Admin />
      </Layout>
    </main>
  </div>
);

export default EventPage;
