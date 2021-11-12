import React, { useEffect, useState } from "react"
import { Image, View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData, Pressable, ImageBackground, KeyboardAvoidingView, Platform } from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"
import { useUser } from "../context/user.context"
import logo from "../assets/images/c4k-logo.png"
import backgroundImage from "../assets/images/SignIn_BG.png"
import { Loading } from "./Loading"
import { OpenUrlLink } from "../components/OpenUrlLink"
import { checkIfRegistered, createMailchimpUserInFirestore, verifyCode, verifyNumber } from "../services/firestore.service"
import { useTheme } from "@react-navigation/native"
import { useStyles } from "../context/styles.context"

export const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [phoneNumberIsVerified, setPhoneNumberIsVerified] = useState(false)
  const [userIsUpdatedInFirestore, setUserIsUpdatedInFirestore] = useState(false)
  const [verifyButtonDisabled, setVerifyButtonDisabled] = useState(true)
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showRegistration, setShowRegistration] = useState(false)
  const { saveUser, user } = useUser()

  const { styles } = useStyles()
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
    const bypassUser = phoneNumber === "5555555555" && email.toLowerCase() === "c.onnerbush@gmail.com"
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

    // save user's mailchimp info to firestore database
    try {
      const { data } = await createMailchimpUserInFirestore(mailchimpUser)
      const { mailchimpMemberInfo, ...userWithoutMemberInfo } = data.user
      saveUser(userWithoutMemberInfo)
      setUserIsUpdatedInFirestore(true)
    } catch (err) {
      setUserIsUpdatedInFirestore(false)
      return registrationError(
        "Oops! Something went wrong! We'll get our elves on it right away!",
        { message: `There was an error in the createMailchimpUserInFirestore firebase function: `, err },
        false
      )
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
    <React.Fragment>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ImageBackground source={backgroundImage} style={{ height: 800, width: "auto", overflow: "hidden" }}>
            <Image
              source={logo}
              style={{
                width: 166,
                height: 170,
                alignSelf: "center",
                marginTop: "35%",
              }}
            />
          </ImageBackground>
          {isLoading ? <Loading /> : null}

          <View style={styles.checkInWrapper}>
            <Text style={styles.checkInTitle}>Let's Get You Checked In</Text>

            {errorMessage.length > 0 ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            {showRegistration ? (
              <OpenUrlLink styles={styles.register} url="https://christmas4kids.org/volunteer/">
                Tap Here to Register
              </OpenUrlLink>
            ) : null}
            {!phoneNumberIsVerified || !userIsUpdatedInFirestore ? (
              <>
                <Text style={styles.checkInSubtitle}>In the form below, enter the phone number & email that you registered with.</Text>
                <View style={styles.textInputView}>
                  <Ionicons name="call" style={styles.textInputIcon} />
                  <TextInput
                    style={styles.textInput}
                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setPhoneNumber(e.nativeEvent.text)}
                    placeholder="phone number"
                    value={phoneNumber}
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    returnKeyLabel="next"
                    autoFocus={true}
                  />
                </View>
                <View style={styles.textInputView}>
                  <Ionicons name="mail" style={styles.textInputIcon} />
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
                <Pressable disabled={verifyButtonDisabled} style={verifyButtonDisabled ? styles.buttonDisabled : styles.button} onPress={verifyRegistration}>
                  <Text style={styles.buttonText}>{"VERIFY REGISTRATION"}</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.checkInSubtitle}>Enter the Verification Code you just received.</Text>
                <View style={styles.textInputView}>
                  <Feather name="check" style={styles.textInputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="verification code"
                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setVerificationCode(e.nativeEvent.text)}
                    value={verificationCode}
                    maxLength={5}
                    returnKeyType="done"
                    returnKeyLabel="done"
                  />
                </View>
                <Pressable disabled={verifyButtonDisabled} style={submitButtonDisabled ? styles.buttonDisabled : styles.button} onPress={verifyUser}>
                  <Text style={styles.buttonText}>{"SUBMIT"}</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </React.Fragment>
  )
}
