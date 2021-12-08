import firebase from "firebase/app"
import "firebase/functions"

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBJfGGK6UiTqlBvTNgegH-n4bslUVOUja8",
    authDomain: "c4k-events.firebaseapp.com",
    databaseURL: "https://c4k-events.firebaseio.com",
    projectId: "c4k-events",
    storageBucket: "c4k-events.appspot.com",
    messagingSenderId: "692878505754",
    appId: "1:692878505754:web:15631f9543142a72a95ea3",
    measurementId: "G-VTN84TXM85",
  })
} else {
  firebase.app()
}

// Uncomment to run firebase functions locally
//firebase.functions().useEmulator("localhost", 5001)

// firebase functions
export const checkIfRegistered = firebase.functions().httpsCallable("checkIfRegistered")
export const verifyNumber = firebase.functions().httpsCallable("verifyNumber")
export const verifyCode = firebase.functions().httpsCallable("verifyCode")
export const createMailchimpUserInFirestore = firebase.functions().httpsCallable("createMailchimpUserInFirestore")
export const fetchRules = firebase.functions().httpsCallable("fetchRules")
export const fetchSchedule = firebase.functions().httpsCallable("fetchSchedule")

// export const testText = firebase.functions().httpsCallable("textMe")
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
