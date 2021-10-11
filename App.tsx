// @refresh state
import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import UserProvider from "./context/user.context"
import firebase from "firebase/app"
import 'firebase/firestore'
import useCachedResources from "./hooks/useCachedResources"
import useColorScheme from "./hooks/useColorScheme"
import Navigation from "./navigation"
/*
const firebaseConfig = {
  apiKey: "AIzaSyBzL6q7c68XrajYg7Wpu9E-rDE2x7rkbzE",
  authDomain: "c4k-test-app.firebaseapp.com",
  projectId: "c4k-test-app",
  storageBucket: "c4k-test-app.appspot.com",
  messagingSenderId: "777707658000",
  appId: "1:777707658000:web:781caf2c0b218ca93ca395",
  measurementId: "G-PGJLXRPC6B"
};
*/
// Initialize Firebase
// if (!firebase.apps.length){
//   firebase.initializeApp(firebaseConfig)
// }

//  const firestore = firebase.firestore()
export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <UserProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </UserProvider>
      </SafeAreaProvider>
    )
  }
}
