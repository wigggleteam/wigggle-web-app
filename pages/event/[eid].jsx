import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../src/Components/Layout';
import Event from '../../src/Components/Event';

export default () => {
  const router = useRouter();
  const { eid } = router.query;
  return (
    <div>
      <Head>
        <title>Event</title>
      </Head>

      <main>
        <Layout>
          <Event eid={eid} />
        </Layout>
      </main>
    </div>
  );
};
