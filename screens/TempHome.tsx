import React from "react"
import { View, Text, StyleSheet, Image, Button } from "react-native"
import { Countdown } from "./Countdown"
import logo from "../assets/images/c4k-logo.png"
import { OpenUrlButton } from "../components/OpenUrlButton"

export const TempHome = () => {
  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
      
        <Text style={styles.sectionTextTop}>Christmas 4 KIDS</Text>
        <Text style={styles.sectionTextTop}>December 14, 2021</Text>
        <Image source={logo} style={{ width: 120, height: 120, alignSelf: "center" }} />
        <Countdown 
        timeTillDate="12 14 2021, 9:00 am" 
		      timeFormat="MM DD YYYY, hh:mm a" 
        /> 

       
        <OpenUrlButton styles={styles.button} url="https://paypal.com/donate/?cmd=_s-xclick&hosted_button_id=ZM6NKQZHSCH2A">
          <Text style={styles.buttonText}>{"DONATE"}</Text>
        </OpenUrlButton>
        <View style={styles.socialsWrapper}>
          <Text>Share With a a Friend</Text>
          <Text>Social Icons and links go here</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 20,
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
    fontSize: 60,
    fontFamily: "Fregata-Sans",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: "#112430",
    marginTop: 20,
    paddingHorizontal: 24,
  },
  socialsWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    fontSize: 30,
    color: "#FFF",
  }
})
