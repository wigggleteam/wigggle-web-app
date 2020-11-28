/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Router from 'next/router';
import App from 'next/app';
import Head from 'next/head';
import NProgress from 'nprogress';
import { wrapper } from '../src/model/store';
// import { appWithTranslation } from '../src/i18n';

NProgress.configure({ minimum: 0.1 });

Router.onRouteChangeStart = () => {
  // console.log('onRouteChangeStart triggered');
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  // console.log('onRouteChangeComplete triggered');
  NProgress.done();
};

Router.onRouteChangeError = () => {
  // console.log('onRouteChangeError triggered');
  NProgress.done();
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta name="viewport" content="viewport-fit=cover" />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default wrapper.withRedux(MyApp);
