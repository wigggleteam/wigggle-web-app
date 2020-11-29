import _ from 'lodash';
import firebase from '../config';

export const db = firebase.firestore();

export function getEventsFromFireStore(observer) {
  return db.collection('events').onSnapshot(observer);
}

export async function getUsersInfoFromFireStore(uid) {
  const document = await db.collection('users').doc(uid).get();
  if (document.exists) {
    return document.data();
  }
  return {};
}

export async function setUsersInfoToFireStore(uid, data) {
  const document = await db.collection('users').doc(uid).update({
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

export function setUserProfileData(user, { firstName, lastName }) {
  return db.collection('users').doc(user.uid).set({
    firstName: firstName || user.displayName,
    lastName: lastName || '',
    email: user.email,
    photoURL: user.photoURL,
    roles: ['USER'],
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

export const updateUserProfilePhoto = async (downloadURL, filename) => {
  const user = firebase.auth().currentUser;
  console.log(user.uid);
  const userDocRef = db.collection('users').doc(user.uid);
  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.exists) {
      throw new Error('User Ref is wrong here');
    }
    const userObj = userDoc.data();
    console.log('This is the user we are going to update : ', userObj);
    console.log('Going to update the user profile photo in DB from', userDoc.data().photoURL, 'to', downloadURL);
    await db.collection('users').doc(user.uid).update({ photoURL: downloadURL });
    /**
     * Why we need to update the auth object lets keep their original profile picture in there..
     */
    // await user.updateProfile({photoURL: downloadURL});
    return await db.collection('users').doc(user.uid).collection('photos').add({
      name: filename,
      url: downloadURL,
    });
  } catch (err) {
    console.log('Error happened while updating image', err);
    throw err;
  }
};

export const updateUserRoles = async ({ uid, roles }) => db.collection('users').doc(uid).update({ roles });
