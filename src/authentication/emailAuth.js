import auth from './initialize';

export const signInWithCredentials = ({email, password}) => {
  return auth.signInWithEmailAndPassword(email, password);
}

export const signUpWithCredentials = ({email, password}) => {
  return auth.createUserWithEmailAndPassword(email, password);
}