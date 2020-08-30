import firebaseApp from '../firebase/initialize';
import { setUserAction, unsetUserAction } from '../model/auth/actions';

const auth = firebaseApp.auth();

auth.onAuthStateChanged(firebaseUser => {
  console.log('Is this wokring?',firebaseUser);
})

export default auth;
