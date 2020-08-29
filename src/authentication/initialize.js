"use strict";

import firebase from 'firebase';

const auth = firebase.auth();

auth.onAuthStateChanged(firebaseUser => {
  console.log(firebaseUser);
})

export default auth;
