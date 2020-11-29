import { db } from './firestoreServices';

export const getImageFromGlobalGallery = async () => {
  const document = await db.collection('configs').doc('globalGallery').get();
  if (document.exists) {
    return document.data();
  }
  return {};
};

export const getServerInfo = async () => {
  const document = await db.collection('configs').doc('system').get();
  if (document.exists) {
    return document.data();
  }
  return {};
};
