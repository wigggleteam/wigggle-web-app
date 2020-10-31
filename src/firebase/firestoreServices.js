import _ from 'lodash';
import firebase from './config';



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

export async function setUsersInfoToFireStore(uid, data){
  const document = await db.collection('users').doc(uid).set({
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    dob: data.dob,
    address: data.address,
    mobile: data.mobile,
    status: 1,
  });
  return document;
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

export const updateUserProfilePhoto = async (downloadURL, filename) => {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection('users').doc(user.uid);
  try {
    const userDoc = await userDocRef.get();
    if(!userDoc.data().photoURL){
      console.log('updating current display picture in db', userDoc.data().photoURL);
      await db.collection('users').doc(user.uid).update({ photoURL: downloadURL});
      await user.updateProfile({photoURL: downloadURL});
    }
    return await db.collection('users').doc(user.uid).collection('photos').add({ 
      name: filename,
      url: downloadURL
    })
  }catch(err) {
    throw err;
  }
}