import React from 'react';
import Router from 'next/router';
import App from 'next/app';
import { wrapper } from '../src/model/store';
import { appWithTranslation } from '../src/i18n';
import NProgress from 'nprogress';

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
    const { Component, pageProps } = this.props
    return (
      <Component {...pageProps} />
    )
  }
}

export default wrapper.withRedux(appWithTranslation(MyApp))