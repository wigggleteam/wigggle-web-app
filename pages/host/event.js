import Head from 'next/head';
import Layout from '../../src/Components/Layout';
import Host from '../../src/Components/Host/index';

export default () => {
  return (
    <div>
      <Head>
        <title>Event</title>
      </Head>

      <main>
        <Layout>
          <Host />
        </Layout>
      </main>
    </div>
  )
}
