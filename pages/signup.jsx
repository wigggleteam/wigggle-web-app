import Head from 'next/head';
import Layout from '../src/Components/Layout';
import Signup from '../src/Components/Signup';

export default () => {
  return (
    <div>
      <Head>
        <title>Sign up</title>
      </Head>

      <main>
        <Layout>
          <Signup />
        </Layout>
      </main>
    </div>
  )
}