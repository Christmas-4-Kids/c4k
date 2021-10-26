import React, { useState, useEffect } from "react"
import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native"
import styles from "../styles"
import firebase from "firebase"

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

//firebase.functions().useEmulator("localhost", 5001)

export const Rules = (props) => {
  const styles = StyleSheet.create({
    page: {
      flex: 1,
      paddingTop: 30,
      paddingBottom: 20,
      backgroundColor: "#112430",
    },
    sectionContainer: {
      flex: 1,
      backgroundColor: "#112430",
      marginTop: 20,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "600",
      color: "#fff",
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: "400",
      color: "#fff",
    },
    closeButton: {
      backgroundColor: "#EF334C", //'#EF334C',
      padding: 20,
      alignItems: "center",
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 18,
      color: "#FFF",
    },
  })

  const [rules, setRules] = useState<any>([])

  const fetchRules = firebase.functions().httpsCallable("fetchRules")

  useEffect(() => {
    fetchRules().then((data) => {
      setRules(data.data)
    })
  }, [])
  useEffect(() => console.log(rules))
  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {rules.map((rule) => (
            <View style={styles.sectionContainer} key={rule.id}>
              <Text style={styles.sectionTitle}>{rule.title}</Text>
              <Text style={styles.sectionDescription}>{rule.description}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => props.navigation.pop()}
          >
            <Text style={styles.buttonText}> Close </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
