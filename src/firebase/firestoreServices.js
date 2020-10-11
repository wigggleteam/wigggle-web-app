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
    dob: { day: _.get(data, 'dob.day', 1), month: _.get(data, 'dob.month', 1), year: _.get(data, 'dob.year', 1995) },
    address: data.address,
    landmark: data.landmark,
    pincode: data.pincode,
    state: data.state,
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