import firebase from './config';

export const uploadToFirebaseStorage = (file, fileName) => {
  var metadata = {
    contentType: 'image/png',
  };
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  return storageRef.child(`${user.uid}/user_images/${fileName}`).put(file, metadata);
}