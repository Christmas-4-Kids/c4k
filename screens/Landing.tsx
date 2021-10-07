import React, { useEffect, useState } from "react"
import { View, StatusBar, useColorScheme, Text } from "react-native"
import styles from "../styles"
import Navigation from "../navigation"

const Landing = props => {
  const colorScheme = useColorScheme()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState()
  const [twilioVerificationCode, setTwilioVerificationCode] = useState()
  const [userIsVerified, setUserIsVerified] = useState(false)

  useEffect(() => {
    setUserIsVerified(!!twilioVerificationCode && verificationCode === twilioVerificationCode)
  }, [twilioVerificationCode, verificationCode])

  return (
    <View style={styles.page}>
      {userIsVerified ? (
        <View style={styles.sectionContainer}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar barStyle="light-content" />
        </View>
      ) : (
        <Text style={styles.sectionText}>Code</Text>
      )}
    </View>
  )
}

export default Landing
