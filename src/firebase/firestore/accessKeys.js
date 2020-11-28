import { db } from "./firestoreServices";

export const getAccessKeyInfo = async (key) => {
  const document = await db.collection('accessToken').doc(key).get();
  if(document.exists){
    return document.data();
  }
}