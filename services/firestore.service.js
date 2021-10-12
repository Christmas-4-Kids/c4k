import firestore from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
require("dotenv").config();
const firebase = require("firebase");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "c4k-events.firebaseapp.com",
  databaseURL: "https://c4k-events.firebaseio.com",
  projectId: "c4k-events",
  storageBucket: "c4k-events.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export const testText = firebase.functions().httpsCallable("textMe");
/*
const collections = ["lebanonChaperones", "allDayChaperones", "eveningChaperones", "drivers"]

async function setMembersByValue(value, where, setState, setFetch) {
  let members = []
  for (let collection of collections) {
    members = []
    // const querySnapshot = await firestore().collection(collection).where(where, "==", value).get()
    // querySnapshot.forEach(doc => {
    //   let d = doc.data()
    //   d.firestoreId = doc.id
    //   d.collection = collection
    //   members.push(d)
    // })
    console.log(`adding ${members.length} members`)
    setState(state => [...state, ...members])
  }
  setFetch({ complete: true })
}

async function addCollectionToFirestoreMembers(collection, setState) {
  let members = []
  // const querySnapshot = await firestore().collection(collection).orderBy("lastNameLower").get()
  // querySnapshot.forEach(doc => {
  //   let d = doc.data()
  //   d.firestoreId = doc.id
  //   d.collection = collection
  //   members.push(d)
  // })
  console.log(`adding ${members.length} members`)
  setState(state => [...state, ...members])
}

async function addCollectionsToFirestoreMembers(setFirestoreMembers, setFetch) {
  for (let collection of collections) {
    await addCollectionToFirestoreMembers(collection, setFirestoreMembers)
  }
  setFetch({ complete: true })
}

function getCollections() {
  return collections
}

export { addCollectionToFirestoreMembers, addCollectionsToFirestoreMembers, setMembersByValue, getCollections }
*/
