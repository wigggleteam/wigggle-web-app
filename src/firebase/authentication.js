import firebaseApp from './config';
import { setUserProfileData, getUsersInfoFromFireStore } from './firestoreServices'; 

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
    await setUserProfileData(data.user, { firstName, lastName });
    return auth.signOut();
  }catch(e){
    throw new Error(e);
  }
}

export const signoutUser = () => {
  return auth.signOut()
}

export const authListener = () => {
  console.log('Authentication | Attaching Listener');
  return (process) => auth.onAuthStateChanged(process)
}

export const socialLogin = async (selectedProvider) => {
  let provider;
  if(selectedProvider === 'facebook'){
    provider = new firebaseApp.auth.FacebookAuthProvider();
  }
  if(selectedProvider === 'google'){
    provider = new firebaseApp.auth.GoogleAuthProvider();
  }
  try {
    const result = await firebaseApp.auth().signInWithPopup(provider);
    const { additionalUserInfo } = result;
    if(additionalUserInfo.isNewUser){
      const { first_name, last_name } = additionalUserInfo;
      await setUserProfileData(result.user, { firstName: first_name, lastName: last_name });
    }
  }catch(error){
    console.log(error);
  }
}