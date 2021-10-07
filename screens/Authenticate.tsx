import React, { useState, useEffect } from "react"
import { View, TextInput, TouchableOpacity, Text } from "react-native"
import { Formik } from "formik"
import styles from "../styles"
import { useUser } from "../context/user.context"
import firestore from "firebase/firestore"
import Device from "expo-device"
import { setMembersByValue } from "../services/firestore.service"

const Authenticate = props => {
  const { user, setUser } = useUser()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formValues, setFormValues] = useState(user)
  //const deviceId = Device.modelName;
  const [matchingFirestoreMembers, setMatchingFirestoreMembers] = useState([])
  const [fetch, setFetch] = useState({ complete: false })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated && isFinished) {
      props.navigation.navigate("HomePage")
    } else if (!isAuthenticated && isFinished) {
      console.log(isFinished)
      setErrorMessage("Couldn't find a user registered with that email and phone number")
    }
  }, [isFinished, isAuthenticated])

  function getMatch(matchingEmails) {
    if (!matchingEmails) return []
    const matchingPhones = matchingEmails.filter(user => {
      return user.phone.replace(/\D/g, "") === formValues.phone.replace(/\D/g, "")
    })
    console.log(`got ${matchingPhones.length} matching phones`)
    return matchingPhones
  }

  async function updateFirestoreUser(firestoreUser) {
    // let unsub = await firestore().collection(firestoreUser.collection).doc(firestoreUser.firestoreId).update({
    //   firstName: firestoreUser.firstName,
    //   lastName: firestoreUser.lastName,
    //   email: firestoreUser.email,
    //   emailLower: firestoreUser.emailLower,
    //   phone: firestoreUser.phone,
    //   lastUpdated: firestoreUser.lastUpdated,
    //   type: user.type,
    //   firestoreId: firestoreUser.firestoreId,
    //   collection: firestoreUser.collection,
    //   // deviceId: deviceId,
    // })
    setIsAuthenticated(true)
    setIsFinished(true)
    setSubmitting(false)
  }

  useEffect(() => {
    let firestoreUser = null
    if (matchingFirestoreMembers.length === 0) {
      setIsFinished(true)
      setSubmitting(false)
      return () => {}
    }
    firestoreUser = matchingFirestoreMembers.length > 1 ? getMatch(matchingFirestoreMembers)[0] : matchingFirestoreMembers[0]

    if (firestoreUser) {
      console.log("found matching user")
      // update firebase user
      firestoreUser.firstName = formValues.firstName
      firestoreUser.lastName = formValues.lastName
      firestoreUser.email = formValues.email
      firestoreUser.emailLower = formValues.email.toLowerCase()
      firestoreUser.phone = formValues.phone
      firestoreUser.lastUpdated = new Date()
      firestoreUser.type = formValues.type
      //firestoreUser.deviceId = deviceId;
      setUser(firestoreUser)
      updateFirestoreUser(firestoreUser)
    } else {
      setIsFinished(true)
      setSubmitting(false)
    }
    return () => {}
  }, [fetch, formValues])

  const authenticateOrganizer = values => {
    if (values.code === "8259") props.navigation.navigate("HomePage")
  }

  const authenticateUser = values => {
    setErrorMessage("")
    setSubmitting(true)
    setMembersByValue(values.email.toLowerCase(), "emailLower", setMatchingFirestoreMembers, setFetch)
    setFormValues(values)
  }

  return (
    <View style={styles.page}>
      <Formik initialValues={user} onSubmit={values => (user.type === "Organizer" ? authenticateOrganizer(values) : authenticateUser(values))}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.sectionContainer}>
            {user.type === "Organizer" ? (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>Code</Text>
                <TextInput style={styles.textInput} onChangeText={handleChange("code")} onBlur={handleBlur("code")} value={values.code} />
              </View>
            ) : (
              <View>
                <Text style={styles.sectionText}>First Name</Text>
                <TextInput style={styles.textInput} onChangeText={handleChange("firstName")} onBlur={handleBlur("firstName")} value={values.firstName} />
                <Text style={styles.sectionText}>Last Name</Text>
                <TextInput style={styles.textInput} onChangeText={handleChange("lastName")} onBlur={handleBlur("lastName")} value={values.lastName} />
                <Text style={styles.sectionText}>Email</Text>
                <TextInput style={styles.textInput} onChangeText={handleChange("email")} onBlur={handleBlur("email")} value={values.email} />
                <Text style={styles.sectionText}>Phone</Text>
                <TextInput style={styles.textInput} onChangeText={handleChange("phone")} onBlur={handleBlur("phone")} value={values.phone} />
              </View>
            )}
            {!!errorMessage && fetch.complete && <Text style={styles.errorMessage}>{errorMessage}</Text>}
            {submitting && <Text style={styles.sectionText}>Signing in...</Text>}

            <View style={styles.sectionContainer}>
              <TouchableOpacity style={styles.button} onPress={() => handleSubmit}>
                <Text style={styles.buttonText}> Submit </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  )
}

export default Authenticate
