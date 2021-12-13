import React from "react"
import { View, TextInput, TouchableOpacity, Text } from "react-native"
import { Formik } from "formik"
import { useStyles } from "../context/styles.context"
import { useUser } from "../context/user.context"
import firestore from "firebase/firestore"
import { C4kText } from "../components/C4kText"

const UserEdit = props => {
  const { user, setUser } = useUser()
  const { styles } = useStyles()
  const updateUser = async user => {
    // get firebase user
    let firestoreUser = null
    // const querySnapshot = await firestore().collection(user.collection).where("emailLower", "==", user.email.toLowerCase()).get()
    const firestoreUserList = []
    // querySnapshot.forEach(doc => {
    //   let d = doc.data()
    //   d.firestoreId = doc.id
    //   firestoreUserList.push(d)
    // })
    if (firestoreUserList.length > 1) {
      const match = firestoreUserList.filter(firestoreUser => {
        return firestoreUser.phone.replace(/\D/g, "") === user.phone.replace(/\D/g, "")
      })
      if (match.length === 1) {
        firestoreUser = match[0]
      }
    } else {
      firestoreUser = firestoreUserList[0]
    }

    if (firestoreUser) {
      // update firebase user
      firestoreUser.firstName = user.firstName
      firestoreUser.lastName = user.lastName
      firestoreUser.email = user.email
      firestoreUser.emailLower = user.email.toLowerCase()
      firestoreUser.phone = user.phone
      firestoreUser.lastUpdated = new Date()
      firestoreUser.type = user.type
      setUser(firestoreUser)
      // await firestore().collection(firestoreUser.collection).doc(firestoreUser.firestoreId).update({
      //   firstName: firestoreUser.firstName,
      //   lastName: firestoreUser.lastName,
      //   email: firestoreUser.email,
      //   emailLower: firestoreUser.emailLower,
      //   phone: firestoreUser.phone,
      //   lastUpdated: firestoreUser.lastUpdated,
      //   type: firestoreUser.type,
      //   firestoreId: firestoreUser.firestoreId,
      // })
    } else {
      setUser(user)
    }
    props.navigation.pop()
  }
  return (
    <View style={styles.page}>
      <C4kText style={styles.sectionTitle}>Update User Information</C4kText>
      <Formik initialValues={user} onSubmit={values => updateUser(values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.sectionContainer}>
            <C4kText style={styles.sectionText}>First Name</C4kText>
            <TextInput style={styles.textInput} onChangeText={handleChange("firstName")} onBlur={handleBlur("firstName")} value={values.firstName} />
            <C4kText style={styles.sectionText}>Last Name</C4kText>
            <TextInput style={styles.textInput} onChangeText={handleChange("lastName")} onBlur={handleBlur("lastName")} value={values.lastName} />
            <C4kText style={styles.sectionText}>Email</C4kText>
            <TextInput style={styles.textInput} onChangeText={handleChange("email")} onBlur={handleBlur("email")} value={values.email} />
            <C4kText style={styles.sectionText}>Phone</C4kText>
            <TextInput style={styles.textInput} onChangeText={handleChange("phone")} onBlur={handleBlur("phone")} value={values.phone} />
            <View style={styles.sectionContainer}>
              <TouchableOpacity style={styles.button} onPress={() => handleSubmit}>
                <C4kText style={styles.buttonText}> Save </C4kText>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={() => props.navigation.pop()}>
                <C4kText style={styles.buttonText}> Cancel </C4kText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  )
}

export default UserEdit
