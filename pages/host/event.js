import Head from 'next/head';
import Layout from '../../src/Components/Layout';
import Profile from '../../src/Components/Profile';

export default () => {
  return (
    <div>
      <Head>
        <title>Wigggle | Event</title>
      </Head>

      <main>
        <Layout>
          <Profile />
        </Layout>
      </main>
    </div>
  )
}
