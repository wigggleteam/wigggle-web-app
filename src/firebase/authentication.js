import firebaseApp from './config';

const auth = firebaseApp.auth();

export const signInWithCredentials = ({email, password}) => {
  return auth.signInWithEmailAndPassword(email, password);
}

export const signUpWithCredentials = ({email, password}) => {
  return auth.createUserWithEmailAndPassword(email, password);
}

export const signUpWithUserData = async ({email, password, firstName, lastName}) => {
  try{
    const data = await signUpWithCredentials({email, password});
    await data.user.updateProfile({displayName: `${firstName} ${lastName}`});
    return auth.signOut();
  }catch(e){
    throw new Error(e);
  }
}

export const signoutUser = () => {
  return auth.signOut()
}

export const authListener = () => {
  console.log('returning listern')
  return (process) => auth.onAuthStateChanged(process)
}
