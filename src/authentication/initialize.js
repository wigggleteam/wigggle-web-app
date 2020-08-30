import firebaseApp from '../firebase/initialize';
import { useDispatch } from 'react-redux'
import { setUserAction, unsetUserAction } from '../model/auth/actions';

const auth = firebaseApp.auth();

console.log(auth.currentUser);


export default auth;
