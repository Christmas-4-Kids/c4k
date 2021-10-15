import React, { useEffect, useState } from "react"
import { Image, View, Text, TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, Button, Alert, Pressable } from "react-native"
import { useUser } from "../context/user.context"
import firebase from "firebase/app"
import logo from "../assets/images/c4k-logo.png"
import { Loading } from "./Loading"
import { OpenUrlLink } from "../components/OpenUrlLink"
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
  })
} else {
  firebase.app()
}

// Uncomment to run firebase functions locally
// firebase.functions().useEmulator("localhost", 5001)

export const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [phoneNumberIsVerified, setPhoneNumberIsVerified] = useState(false)
  const [verifyButtonDisabled, setVerifyButtonDisabled] = useState(true)
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showRegistration, setShowRegistration] = useState(false)
  const { saveUser, user } = useUser()

  // firebase functions
  const checkIfRegistered = firebase.functions().httpsCallable("checkIfRegistered")
  const verifyNumber = firebase.functions().httpsCallable("verifyNumber")
  const verifyCode = firebase.functions().httpsCallable("verifyCode")
  const createMailchimpUserInFirestore = firebase.functions().httpsCallable("createMailchimpUserInFirestore")

  // validate E164 format
  const validE164 = (num: string) => {
    return /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(num)
  }

  const resetLoadingAndMessaging = () => {
    setIsLoading(true)
    setErrorMessage("")
    setShowRegistration(false)
  }

  const verifyRegistration = async () => {
    // backdoor
    const bypassUser = phoneNumber === "5555555555" && email === "c.onnerbush@gmail.com"
    if (bypassUser) {
      saveUser({ ...user, verified: bypassUser })
      setPhoneNumberIsVerified(true)
      setIsLoading(false)
      return
    }

    resetLoadingAndMessaging()

    const registrationError = (errorMessage: string, internalError?: { message: string; err: any }, shouldShowRegistration: boolean = false) => {
      if (internalError) console.log(internalError.message, internalError.err)
      setErrorMessage(errorMessage)
      setIsLoading(false)
      setShowRegistration(shouldShowRegistration)
      return
    }

    // ensure phone number is a valid phone number
    const phoneNumberIsValid = validE164(`+1` + phoneNumber)
    if (!phoneNumberIsValid) {
      return registrationError("Oops! Looks like that's not a valid number.")
    }

    // get mailchimp user
    let mailchimpUser
    try {
      const { data } = await checkIfRegistered(email.trim())
      mailchimpUser = data
    } catch (err) {
      return registrationError("Oops! Looks like something went wrong! We'll work on fixing it real soon.", {
        message: `There was an error in the checkIfRegistered firebase function: `,
        err,
      })
    }
    if (!mailchimpUser) {
      return registrationError("Oops! Looks like you forgot to register.", null, true)
    }

    // send twilio verification
    try {
      await verifyNumber(`+1${phoneNumber}`)
      setPhoneNumberIsVerified(true)
    } catch (err) {
      return registrationError("Oops! Looks like something went wrong! We'll work on fixing it real soon.", {
        message: `There was an error in the verifyNumber firebase function: `,
        err,
      })
    }

    // save user's mailchimp info to firestore database
    try {
      const { data } = await createMailchimpUserInFirestore(mailchimpUser)
      const { mailchimpMemberInfo, ...userWithoutMemberInfo } = data.user
      saveUser(userWithoutMemberInfo)
    } catch (err) {
      console.log(`There was an error in the createMailchimpUserInFirestore firebase function: `, err)
    }

    setIsLoading(false)
  }

  const verifyUser = () => {
    setIsLoading(true)
    setErrorMessage("")
    setShowRegistration(false)
    verifyCode({
      phoneNumber: `+1${phoneNumber}`,
      code: verificationCode,
    })
      .then(result => {
        if (result.data === "approved") {
          saveUser({ ...user, verified: true })
        } else {
          setErrorMessage("Invalid verification code")
        }
      })
      .catch(err => {
        console.log(`err`, err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setVerifyButtonDisabled(isLoading || phoneNumber.length < 8 || email.length < 4)
  }, [isLoading, phoneNumber, email])

  useEffect(() => {
    setSubmitButtonDisabled(isLoading || verificationCode.length !== 5)
  }, [isLoading, verificationCode])

  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <Image source={logo} style={{ width: 180, height: 180, alignSelf: "center", marginTop: 20 }} />
        <Text style={styles.sectionTitle}>Sign In</Text>
        {errorMessage.length > 0 && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        {showRegistration && (
          <OpenUrlLink styles={styles.sectionText} url="https://christmas4kids.org/volunteer/">
            Tap Here to Register
          </OpenUrlLink>
        )}
        {isLoading && <Loading />}
        {!phoneNumberIsVerified ? (
          <>
            <View style={styles.sectionContainer}>
              <Text style={styles.textInputText}>Enter the phone number you used to register</Text>
              <TextInput
                style={styles.textInput}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setPhoneNumber(e.nativeEvent.text)}
                placeholder="phone number"
                value={phoneNumber}
                keyboardType="phone-pad"
                returnKeyType="next"
                returnKeyLabel="next"
              />
              <Text style={styles.textInputText}>Enter the email address you used to register</Text>
              <TextInput
                style={styles.textInput}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setEmail(e.nativeEvent.text)}
                value={email}
                placeholder="email address"
                keyboardType="email-address"
                returnKeyType="done"
                returnKeyLabel="done"
              />
            </View>
            <View style={styles.sectionContainer}>
              <Pressable disabled={verifyButtonDisabled} style={verifyButtonDisabled ? styles.buttonDisabled : styles.button} onPress={verifyRegistration}>
                <Text style={styles.buttonText}>{"Verify Registration"}</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View style={styles.sectionContainer}>
            <Text style={styles.textInputText}>Enter verification code</Text>
            <TextInput
              style={styles.textInput}
              placeholder="verification code"
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setVerificationCode(e.nativeEvent.text)}
              value={verificationCode}
              maxLength={5}
              returnKeyType="done"
              returnKeyLabel="done"
            />
            <Pressable disabled={verifyButtonDisabled} style={submitButtonDisabled ? styles.buttonDisabled : styles.button} onPress={verifyUser}>
              <Text style={styles.buttonText}>{"SUBMIT"}</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 20,
    backgroundColor: "#112430",
  },
  button: {
    backgroundColor: "#EF334C",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonDisabled: {
    backgroundColor: "#EF334C",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontFamily: "ZillaSlab-Medium",
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
    color: "#EF334C",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "ZillaSlab-Medium",
  },
  sectionTitle: {
    fontSize: 34,
    color: "#fff",
    alignSelf: "center",
    fontFamily: "Fregata-Sans",
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: "#112430",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: "#fff",
  },
  sectionText: {
    color: "#fff",
    fontFamily: "ZillaSlab-Medium",
    textDecorationLine: "underline",
    alignSelf: "center",
  },
  textInputText: {
    color: "#cbcbcb",
    fontSize: 12,
    paddingBottom: 5,
    fontFamily: "ZillaSlab-Medium",
  },
})
