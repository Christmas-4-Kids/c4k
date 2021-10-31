import React from "react"
import { View, Text, StyleSheet, Image, Button, ScrollView} from "react-native"
import { Countdown } from "./Countdown"
import logo from "../assets/images/c4k-logo2.png"
import { OpenUrlButton } from "../components/OpenUrlButton"

export const TempHome = () => {
  return (
    <View style={styles.page}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.sectionContainer}>
        <Image source={logo} style={{ width: 124, height: 59, alignSelf: "center", backgroundColor: "#112430" }} />
      </View>
        <View style={styles.countdownContainer}>
          <Text style={{ fontFamily: "FjallaOne", fontSize: 16 }}>Name, Get Ready to Shop In:</Text>
          <Countdown 
          timeTillDate="12 14 2021, 9:00 am" 
            timeFormat="MM DD YYYY, hh:mm a" 
          /> 
        </View>

        <View style={styles.sectionContainer}>

        <OpenUrlButton styles={styles.button} url="https://paypal.com/donate/?cmd=_s-xclick&hosted_button_id=ZM6NKQZHSCH2A">
          <Text style={styles.buttonText}>{"DONATE"}</Text>
        </OpenUrlButton>
       </View>
       <View style={styles.sectionContainer}>
        <View style={styles.socialsWrapper}>
          <Text>Share With a a Friend</Text>
          <Text>Social Icons and links go here</Text>
        </View>
      </View>
      </ScrollView>
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
  // sectionTextTop: {
  //   fontSize: 60,
  //   fontFamily: "Fregata-Sans",
  //   color: "#fff",
  //   textAlign: "center",
  //   marginTop: 10,
  // },
  sectionContainer: {
    flex: 1,
    // backgroundColor: "#112430",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 11,
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
  },
  countdownContainer: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 9,
    borderRadius: 10,
    textAlign: "center",
    paddingBottom: 27,
    paddingTop: 40,
    paddingHorizontal: 34
  },
})

