import Head from 'next/head';
import Layout from '../src/Components/Layout';
import Showcase from '../src/Components/Showcase';

export default () => {
  return (
    <div>
      <Head>
        <title>ShowCase</title>
      </Head>

      <main>
        <Layout>
          <Showcase />
        </Layout>
      </main>
    </div>
  )
}
