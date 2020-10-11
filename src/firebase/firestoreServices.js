import firebase from './config'


const db = firebase.firestore();

export function getEventsFromFireStore(observer){
  return db.collection('events').onSnapshot(observer);
}

export async function getUsersInfoFromFireStore(uid){
  const document = await db.collection('users').doc(uid).get();
  if(document.exists){
    return document.data();
  }
}

export function setUserProfileData(user, { firstName, lastName }){
  return db.collection('users').doc(user.uid).set({
    firstName: firstName || user.displayName,
    lastName: lastName || "",
    email: user.email,
    photoURL: user.photoURL,
    roles: ["USER"],
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
}