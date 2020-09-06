import firebaseApp from './config';

const auth = firebaseApp.auth();


export const signInWithCredentials = ({email, password}) => {
  return auth.signInWithEmailAndPassword(email, password);
}

export const signUpWithCredentials = ({email, password}) => {
  return auth.createUserWithEmailAndPassword(email, password);
}

export const signoutUser = () => {
  return auth.signOut()
}

export const authListener = () => {
  console.log('returning listern')
  return (process) => auth.onAuthStateChanged(process)
}
