import Head from 'next/head';
import Layout from '../src/Layout';
import Home from '../src/Home';

export default () => {
  return (
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
  )
}
