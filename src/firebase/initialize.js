import * as firebase from 'firebase';


var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyDbojNOd26LYDg6d8XHYChhw2tVtZ_Xovs',
  authDomain: process.env.AUTH_DOMAIN || 'wigggle-india.firebaseapp.com',
  databaseURL: process.env.DATABASE_URL || 'https://wigggle-india.firebaseio.com',
  projectId: process.env.PROJECT_ID || 'wigggle-india',
  storageBucket: process.env.STORAGE_BUCKET || 'wigggle-india.appspot.com',
  messagingSenderId: process.env.MESSAGING_SENDER_ID || '848604277499',
  appId: process.env.APP_ID || '1:848604277499:web:d900c5415ffe9a654e1e5e',
  measurementId: process.env.MEASUREMENT_ID || 'G-SPGD3GDW95'
};

console.log('Apps in firebase right now -> ', firebase.apps.length);
console.log('Config ', firebaseConfig);
if (!firebase.apps.length) {
  console.log('Initializing firebase');
  firebase.initializeApp(firebaseConfig);
}

export default firebase;