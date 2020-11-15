import Head from 'next/head';
import Layout from '../../src/Components/Layout';
import CreateEvent from '../../src/Components/Host/CreateEvent';

export default () => {
  return (
    <div>
      <Head>
        <title>Event</title>
      </Head>

      <main>
        <Layout>
          <CreateEvent />
        </Layout>
      </main>
    </div>
  )
}
