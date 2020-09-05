import firebase from './config'


const db = firebase.firestore();

export function getEventsFromFireStore(observer){
  return db.collection('events').onSnapshot(observer);
}