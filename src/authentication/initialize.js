import firebaseApp from '../firebase/config';

const auth = firebaseApp.auth();

console.log(auth.currentUser);


export default auth;
