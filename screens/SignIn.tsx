import React, { useEffect, useState } from "react"
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Button,
  Alert,
  Pressable,
  ImageBackground,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useUser } from "../context/user.context"
import logo from "../assets/images/c4k-logo.png"
import backgroundImage from "../assets/images/SignIn_BG.png"
import { Loading } from "./Loading"
import { OpenUrlLink } from "../components/OpenUrlLink"
import {
  checkIfRegistered,
  createMailchimpUserInFirestore,
  verifyCode,
  verifyNumber,
} from "../services/firestore.service"
import { useTheme } from "@react-navigation/native"
import { useStyles } from "../context/styles.context"

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

  const { colors } = useTheme()
  const { styles } = useStyles()
  // validate E164 format
  const validE164 = (num: string) => {
    return /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(
      num
    )
  }

  const resetLoadingAndMessaging = () => {
    setIsLoading(true)
    setErrorMessage("")
    setShowRegistration(false)
  }

  const verifyRegistration = async () => {
    // backdoor
    const bypassUser =
      phoneNumber === "5555555555" &&
      email.toLowerCase() === "c.onnerbush@gmail.com"
    if (bypassUser) {
      saveUser({ ...user, verified: bypassUser })
      setPhoneNumberIsVerified(true)
      setIsLoading(false)
      return
    }

    resetLoadingAndMessaging()

    const registrationError = (
      errorMessage: string,
      internalError?: { message: string; err: any },
      shouldShowRegistration: boolean = false
    ) => {
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
      return registrationError(
        "Oops! Looks like something went wrong! We'll work on fixing it real soon.",
        {
          message: `There was an error in the checkIfRegistered firebase function: `,
          err,
        }
      )
    }
    if (!mailchimpUser) {
      return registrationError(
        "Oops! Looks like you forgot to register.",
        null,
        true
      )
    }

    // send twilio verification
    try {
      await verifyNumber(`+1${phoneNumber}`)
      setPhoneNumberIsVerified(true)
    } catch (err) {
      return registrationError(
        "Oops! Looks like something went wrong! We'll work on fixing it real soon.",
        {
          message: `There was an error in the verifyNumber firebase function: `,
          err,
        }
      )
    }

    // save user's mailchimp info to firestore database
    try {
      const { data } = await createMailchimpUserInFirestore(mailchimpUser)
      const { mailchimpMemberInfo, ...userWithoutMemberInfo } = data.user
      saveUser(userWithoutMemberInfo)
    } catch (err) {
      console.log(
        `There was an error in the createMailchimpUserInFirestore firebase function: `,
        err
      )
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
      .then((result) => {
        if (result.data === "approved") {
          saveUser({ ...user, verified: true })
        } else {
          setErrorMessage("Invalid verification code")
        }
      })
      .catch((err) => {
        console.log(`err`, err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setVerifyButtonDisabled(
      isLoading || phoneNumber.length < 8 || email.length < 4
    )
  }, [isLoading, phoneNumber, email])

  useEffect(() => {
    setSubmitButtonDisabled(isLoading || verificationCode.length !== 5)
  }, [isLoading, verificationCode])

  return (
    <ImageBackground
      source={backgroundImage}
      style={{ height: "100vh", width: "auto" }}
    >
      <Image
        source={logo}
        style={{
          width: 166,
          height: 170,
          alignSelf: "center",
          marginTop: "35%",
        }}
      />

      {errorMessage.length > 0 && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
      {showRegistration && (
        <OpenUrlLink
          styles={styles.sectionText}
          url="https://christmas4kids.org/volunteer/"
        >
          Tap Here to Register
        </OpenUrlLink>
      )}
      {isLoading && <Loading />}

      {!phoneNumberIsVerified ? (
        <>
          <View style={checkInWrapper}>
            <Text style={checkInTitle}>Let's Get You Checked In</Text>
            <Text style={checkInSubtitle}>
              In the form below, enter the phone number & email that you
              registered with.
            </Text>
            <View style={textInputView}>
              <Ionicons name="call" style={textInputIcon} />
              <TextInput
                style={styles.textInput}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                  setPhoneNumber(e.nativeEvent.text)
                }
                placeholder="phone number"
                value={phoneNumber}
                keyboardType="phone-pad"
                returnKeyType="next"
                returnKeyLabel="next"
              />
            </View>
            <View style={textInputView}>
              <Ionicons name="mail" style={textInputIcon} />
              <TextInput
                style={styles.textInput}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                  setEmail(e.nativeEvent.text)
                }
                value={email}
                placeholder="email address"
                keyboardType="email-address"
                returnKeyType="done"
                returnKeyLabel="done"
              />
            </View>
            <Pressable
              disabled={verifyButtonDisabled}
              style={
                verifyButtonDisabled ? styles.buttonDisabled : styles.button
              }
              onPress={verifyRegistration}
            >
              <Text style={styles.buttonText}>{"VERIFY REGISTRATION"}</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <View style={checkInWrapper}>
          {/*<Text style={styles.textInputText}>Enter verification code</Text>*/}
          <Text style={checkInTitle}>Let's Get You Checked In</Text>
          <Text style={checkInSubtitle}>
            Enter the Verification Code you just received.
          </Text>
          <View style={textInputView}>
            <TextInput
              style={styles.textInput}
              placeholder="verification code"
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                setVerificationCode(e.nativeEvent.text)
              }
              value={verificationCode}
              maxLength={5}
              returnKeyType="done"
              returnKeyLabel="done"
            />
          </View>
          <Pressable
            disabled={verifyButtonDisabled}
            style={submitButtonDisabled ? styles.buttonDisabled : styles.button}
            onPress={verifyUser}
          >
            <Text style={styles.buttonText}>{"SUBMIT"}</Text>
          </Pressable>
        </View>
      )}
    </ImageBackground>
  )
}

const checkInWrapper = {
  flex: 1,
  backgroundColor: "#FFFFFF",
  width: "100vw",
  paddingHorizontal: 56,
  paddingVertical: 31,
  textAlign: "center",
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
  position: "fixed",
  bottom: 0,
  minHeight: 230,
}
const textInputView = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  height: 42,
  borderColor: "black",
  borderWidth: 1,
  marginBottom: 5,
  color: "#2C363D",
  fontSize: 11.2,
}
const textInputIcon = {
  display: "inline",
  color: "#E8364D",
  fontSize: 20,
  margin: 10,
}
const checkInTitle = {
  fontFamily: "FjallaOne",
  fontWeight: 400,
  fontSize: "1.7rem",
}
const checkInSubtitle = {
  fontFamily: "ZillaSlab",
  fontSize: ".8rem",
  color: "#E8364D",
  paddingBottom: 4,
}
