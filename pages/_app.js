import React from 'react';
import App from 'next/app';
import { appWithTranslation } from '../src/i18n';
import * as firebase from 'firebase';

const {
  IS_PRODUCTION,
  // FIREBASE_API_KEY,
  // AUTH_DOMAIN,
  // DATABASE_URL,
  // PROJECT_ID,
  // STORAGE_BUCKET,
  // MESSAGING_SENDER_ID,
  // APP_ID,
  // MEASUREMENT_ID
} = process.env;

console.log('Vineet', IS_PRODUCTION);

// var firebaseConfig = {
//   apiKey: FIREBASE_API_KEY,
//   authDomain: AUTH_DOMAIN,
//   databaseURL: DATABASE_URL,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
//   measurementId: MEASUREMENT_ID
// };

//firebase.initializeApp(firebaseConfig);
//firebase.analytics();
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Component {...pageProps} />
    )
  }
}

export default appWithTranslation(MyApp)