import firebase from '../config';
import { db } from "./firestoreServices";

export const createNewEvent = async () => {
  return db.collection('events').add({
    amenities: ["wifi"],
    categoryL1: "function",
    categoryL2: "otherFunction",
    eventDate: firebase.firestore.FieldValue.serverTimestamp(),
    isRemote: false,
    link: "",
    tags: ["fuck", "fuck", "more"],
    ticket: {
      basic: "300"
    },
    hosts: {
      leader: {
        imageUrl: "someurl",
        name: "Name here",
        ref: "/users/motherfuckingREF"
      }
    },
    imagesUrl: ["https://picsum.photos/600/300", "https://picsum.photos/600/300", "https://picsum.photos/600/300"],
    title: "Love is life",
    description: "This life sucks mother fuckers"
  })
}