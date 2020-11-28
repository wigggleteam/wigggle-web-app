/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import firebase from '../config';
import { db } from './firestoreServices';

export const createNewEvent = async ({
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
        imageUrl: 'someurl',
        name: 'Name here',
        ref: '/users/motherfuckingREF',
      },
    },
    imagesUrl: imagesUrlsToInsert,
    title,
    description,
  });
};
