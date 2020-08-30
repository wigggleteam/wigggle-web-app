import React from 'react';
import App from 'next/app';
import { wrapper } from '../src/model/store';
import { appWithTranslation } from '../src/i18n';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Component {...pageProps} />
    )
  }
}

export default wrapper.withRedux(appWithTranslation(MyApp))