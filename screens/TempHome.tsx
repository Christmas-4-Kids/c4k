import React from "react"
import { View, Text, StyleSheet, Image, Button } from "react-native"
import { Countdown } from "./Countdown"
import logo from "../assets/images/c4k-logo.png"
import { OpenUrlButton } from "../components/OpenUrlButton"

export const TempHome = () => {
  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <Image source={logo} style={{ width: 100, height: 100, alignSelf: "center" }} />
        <Text style={styles.sectionTextTop}>Stay tuned...</Text>
        <Text style={styles.sectionTextBottom}>December 14 @ 9AM</Text>
        <Countdown 
          timeTillDate="12 14 2021, 9:00 am" 
		      timeFormat="MM DD YYYY, hh:mm a" 
	      /> 

       
        <OpenUrlButton styles={styles.button} url="https://linktoDonate">
          <Text style={styles.buttonText}>{"DONATE"}</Text>
        </OpenUrlButton>
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
    fontFamily: "ZillaSlab-Medium",
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
    fontFamily: "ZillaSlab-Medium",
  },
  sectionTextTop: {
    fontSize: 80,
    fontFamily: "Fregata-Sans",
    color: "#fff",
    textAlign: "center",
    marginTop: 30,
  },
  sectionTextBottom: {
    fontSize: 60,
    fontFamily: "Fregata-Sans",
    color: "#fff",
    textAlign: "center",
    marginTop: 30,
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: "#112430",
    marginTop: 20,
    paddingHorizontal: 24,
  },
})
