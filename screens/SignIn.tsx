import React, { useState } from "react"
import { View, Text, TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, Button } from "react-native"
import { useUser } from "../context/user.context"
import { getMailchimpList } from '../functions/index.js'
import axios from 'axios'
export const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [twilioVerificationCode, setTwilioVerificationCode] = useState("")
  const [phoneNumberIsVerified, setPhoneNumberIsVerified] = useState(false)
  const { setUserIsVerified } = useUser()

  const phoneNumberIsRegistered = () => {
    // TODO: send number to mailchimp to verify
    //docs: https://mailchimp.com/developer/marketing/api/list-members/list-members-info/
   
    /*
    try{
      getMailchimpList() // just logs right now
      const mailChimpList = getMailchimpList()
      getMailchimpList.filter(member => phoneNumber === member.merge_fields.phone)

    }catch (error){
      console.log(error)
    }
    */

    // TODO: if number is valid then fetch twilioVerificationCode from Firebase using phoneNumber
    //      -> set twilioVerificationCode
    //      -> return true
    // TODO: if number is not valid return false

    // return true for now
    return true
  }
  const verifyPhoneNumber = () => {
    if (phoneNumberIsRegistered()) {
      setPhoneNumberIsVerified(true)
    }
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