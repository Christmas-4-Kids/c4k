import React, { useState } from "react"
import { View, Text, TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, Button } from "react-native"
import { useUser } from "../context/user.context"
import { checkIfRegistered } from '../functions'
import firebase from "firebase/app";
require("firebase/functions");


const firebaseConfig = {
  apiKey: "AIzaSyBJfGGK6UiTqlBvTNgegH-n4bslUVOUja8",
  authDomain: "c4k-events.firebaseapp.com",
  databaseURL: "https://c4k-events.firebaseio.com",
  projectId: "c4k-events",
  storageBucket: "c4k-events.appspot.com",
  messagingSenderId: "692878505754",
  appId: "1:692878505754:web:15631f9543142a72a95ea3",
  measurementId: "G-VTN84TXM85"
};
firebase.initializeApp(firebaseConfig);
const functions = firebase.functions();
export const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [twilioVerificationCode, setTwilioVerificationCode] = useState("")
  const [phoneNumberIsVerified, setPhoneNumberIsVerified] = useState(false)
  const [phoneNumberIsRegistered, setPhoneNumberIsRegistered] = useState(false)
  const { setUserIsVerified } = useUser()
  const checkIfRegistered = firebase.functions().httpsCallable("checkIfRegistered")
  
  const checkMailchimp = async () => {
    // TODO: why is checkIfRegistered firebase function undefined?
   // maybe I need to use axios instead
    // TODO: AsyncStorage
    
    checkIfRegistered({phoneNumber: phoneNumber})
    .then(result => {
      console.log(`User is Registered: ${result.data}`)
      return result.data
    })
    .catch(err => console.log("fail"))

  }
  const verifyPhoneNumber = () => {
    try{
      console.log("trying")
      const regStatus = checkMailchimp()
      // setPhoneNumberIsRegistered(regStatus)
      setPhoneNumberIsRegistered(true)
    }catch (err){
      console.log(err)
    }
    //Thomas using verifyNumber for twilio 
    //change phoneNumberIsRegistered method to state

  }

  const verifyUser = () => {
    setUserIsVerified(verificationCode === twilioVerificationCode)
  }

  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Sign In</Text>
        <View style={styles.sectionContainer}>
          {/* TODO: style text */}
          <Text style={styles.sectionText}>Enter the phone number you used to register</Text>
          <TextInput style={styles.textInput} onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setPhoneNumber(e.nativeEvent.text)} value={phoneNumber} />
          {/* TODO: style button */}
          <Button title="Verify Phone Number" onPress={verifyPhoneNumber} />
        </View>
        {phoneNumberIsVerified && (
          <View style={styles.sectionContainer}>
            {/* TODO: style text */}
            <Text style={styles.sectionText}>Enter verification code</Text>
            <TextInput
              style={styles.textInput}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setVerificationCode(e.nativeEvent.text)}
              value={verificationCode}
            />
            {/* TODO: style button*/}
            <Button title="Submit" onPress={verifyUser} />
          </View>
        )}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: "#112430",
  },
  button: {
    backgroundColor: "#EF334C",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
  },
  textInput: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 10,
    marginBottom: 20,
    padding: 5,
    color: "#fff",
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: "#112430",
    marginTop: 20,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: "#fff",
  },
  sectionText: {
    color: "#fff",
  },
})
