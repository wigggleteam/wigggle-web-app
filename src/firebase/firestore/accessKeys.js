import { db } from "./firestoreServices";

export async function getUsersInfoFromFireStore(uid){
  const document = await db.collection('users').doc(uid).get();
  if(document.exists){
    return document.data();
  }
}

export const getAccessKeyInfo = async (key) => {
  const document = await db.collection('accessToken').doc(key).get();
  if(document.exists){
    return document.data();
  }
}