import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import styles from "../styles"
import { useUser } from "../context/user.context"
//import Device from "expo-device";
import { setMembersByValue } from "../services/firestore.service"

const Landing = props => {
  const { user, setUser } = useUser()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [matchingDeviceIdFirestoreMembers, setMatchingDeviceIdFirestoreMembers] = useState([])
  const [fetch, setFetch] = useState({ complete: false })
  //const deviceId = Device.modelName;

  useEffect(() => {
    setMembersByValue(
      // deviceId,
      //"deviceId",
      setMatchingDeviceIdFirestoreMembers,
      setFetch
    )
  }, [])

  const setUserType = type => {
    setUser({ ...user, type: type })
    props.navigation.navigate("AuthenticatePage")
  }

  useEffect(() => {
    let firestoreUser = null
    console.log(matchingDeviceIdFirestoreMembers.length)
    if (matchingDeviceIdFirestoreMembers.length === 1) {
      console.log("found")
      firestoreUser = matchingDeviceIdFirestoreMembers[0]
      setUser(firestoreUser)
      setIsAuthenticated(true)
      setIsFinished(true)
    } else {
      setIsAuthenticated(false)
      setIsFinished(true)
    }
  }, [fetch])

  useEffect(() => {
    if (isAuthenticated && isFinished) {
      props.navigation.navigate("HomePage")
    }
  }, [isFinished, isAuthenticated])
  return (
    <View style={styles.page}>
      {fetch.complete && (
        <View style={styles.sectionContainer}>
          <View style={styles.sectionContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setUserType("Chaperone")}>
              <Text style={styles.buttonText}> Chaperone </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setUserType("Organizer")}>
              <Text style={styles.buttonText}> Organizer </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setUserType("Driver")}>
              <Text style={styles.buttonText}> Bus Driver </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}

export default Landing
