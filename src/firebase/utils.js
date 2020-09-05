import firebase from './config';
import _ from 'lodash';

export const fixDateInEntity = (date) => {
  
}

export const fetchDataFromEventSnapshot = (snapshot) => {
  if(!snapshot.exists) return;

  const data = snapshot.data();

  if(Array.isArray(data.eventDates) && data.eventDates.length > 0) {
    _.each(data.eventDates, (date, index) => {
      if(date instanceof firebase.firestore.Timestamp) {
        data.eventDates[index] = date.toDate();
      }
    });
  }

  return {
    ...data,
    id: snapshot.id
  }
}

