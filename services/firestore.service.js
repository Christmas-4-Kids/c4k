import { initializeApp } from "firebase/app"
import { getFunctions, httpsCallable, connectFunctionsEmulator, updateDoc, doc } from "firebase/functions"
import { getFirestore } from "firebase/firestore"

// if (!firebase.apps.length) {
const app = initializeApp({
  apiKey: "AIzaSyBJfGGK6UiTqlBvTNgegH-n4bslUVOUja8",
  authDomain: "c4k-events.firebaseapp.com",
  databaseURL: "https://c4k-events.firebaseio.com",
  projectId: "c4k-events",
  storageBucket: "c4k-events.appspot.com",
  messagingSenderId: "692878505754",
  appId: "1:692878505754:web:15631f9543142a72a95ea3",
  measurementId: "G-VTN84TXM85",
})
// } else {
//   firebase.app()
// }

const functions = getFunctions(app)

// Uncomment to run firebase functions locally
connectFunctionsEmulator(functions, "localhost", 5001)

// firebase functions
export const checkIfRegistered = httpsCallable(functions, "checkIfRegistered")
export const verifyNumber = httpsCallable(functions, "verifyNumber")
export const verifyCode = httpsCallable(functions, "verifyCode")
export const createMailchimpUserInFirestore = httpsCallable(functions, "createMailchimpUserInFirestore")
export const fetchRules = httpsCallable(functions, "fetchRules")
export const syncMailchimpVolunteers = httpsCallable(functions, "syncMailchimpVolunteers")
export const updateVolunteerCheckedIn = httpsCallable(functions, "updateVolunteerCheckedIn")

export const db = getFirestore()
