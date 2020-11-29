/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import firebase from '../config';
import { db } from './firestoreServices';

export const createNewEvent = async (authorSession, {
  categoryL1, categoryL2,
  title,
  description,
  eventDate = new Date(),
  amenities = [],
  tickets,
  imagesUrls = [],
}) => {
// TODO: Add some validation before adding a new event

  let imagesUrlsToInsert = _.cloneDeep(imagesUrls);
  if (imagesUrls.length < 1) {
    imagesUrlsToInsert = [`https://via.placeholder.com/600x300.png/000000/FFFFFF?text=${title}`];
  }

  const { user, userInfo } = authorSession;

  db.collection('events').add({
    verification: 'pending',
    amenities,
    categoryL1,
    categoryL2,
    eventDate,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    isRemote: false,
    link: '',
    tags: ['tag1', 'tag2', 'tag3'],
    tickets,
    hosts: {
      leader: {
        imageUrl: userInfo.photoURL,
        name: `${userInfo.firstName} ${userInfo.lastName}`,
        ref: `/users/${user.uid}`,
      },
    },
    imagesUrl: imagesUrlsToInsert,
    title,
    description,
  });
};

export const fetchEventFromId = async (eventId) => {
  if (!eventId) return {};

  const document = await db.collection('events').doc(eventId).get();
  if (document.exists) {
    const eventObj = document.data();
    if (eventObj.eventDate && eventObj.eventDate instanceof firebase.firestore.Timestamp) {
      eventObj.eventDate = eventObj.eventDate.toDate();
    }
    return eventObj;
  }
  return {};
};
