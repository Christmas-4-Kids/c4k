import React, { useState } from "react"
import { View, StatusBar, useColorScheme, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData, Button } from "react-native"
import styles from "../styles"
import Navigation from "../navigation"

export const Landing = () => {
  const colorScheme = useColorScheme()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [twilioVerificationCode, setTwilioVerificationCode] = useState("")
  const [userIsVerified, setUserIsVerified] = useState(false)
  const [phoneNumberIsVerified, setPhoneNumberIsVerified] = useState(false)

  const phoneNumberIsRegistered = () => {
    // TODO: send number to mailchimp to verify
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
    setUserIsVerified(twilioVerificationCode !== "" && verificationCode === twilioVerificationCode)
  }

  return (
    <View style={styles.page}>
      {userIsVerified ? (
        <View style={styles.sectionContainer}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar barStyle="light-content" />
        </View>
      ) : (
        <View style={styles.sectionContainer}>
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
      )}
    </View>
  )
}
