import React from "react"
import { View, Text, StyleSheet, Image, Button, ScrollView, Linking, Pressable} from "react-native"
import { SocialIcon } from 'react-native-elements'
import { Countdown } from "./Countdown"
import logo from "../assets/images/c4k-logo2.png"
import { OpenUrlButton } from "../components/OpenUrlButton"

export const TempHome = () => {
  const openDonateLink = () => {
    Linking.openURL('https://paypal.com/donate/?cmd=_s-xclick&hosted_button_id=ZM6NKQZHSCH2A')
  }
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

        {/* <OpenUrlButton styles={styles.button} url="https://paypal.com/donate/?cmd=_s-xclick&hosted_button_id=ZM6NKQZHSCH2A">
          <Text style={styles.buttonText}>{"DONATE"}</Text>
        </OpenUrlButton> */}
          <Pressable style={styles.button} onPress={openDonateLink}>
            <Text style={styles.buttonText}>{"Donate"}</Text>
          </Pressable>
       </View>
       <View style={styles.sectionContainer}>
        <View style={styles.socialsWrapper}>
          <SocialIcon
            light
            onPress={() => {Linking.openURL('https://www.facebook.com/Christmas4Kids/')}}
            type='facebook'
          />
          <SocialIcon
            light
            onPress={() => {Linking.openURL('https://www.instagram.com/christmas4kidstn/')}}
            type='instagram'
          />
          <SocialIcon
            light
            onPress={() => {Linking.openURL('https://twitter.com/nashvillec4k')}}
            type='twitter'
          />
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
    backgroundColor: "#318AC7",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 264,
    height: 70,
  // background: linear-gradient(94.08deg, #318AC7 0.48%, #41B187 100.57%);
  },
  buttonText: {
    backgroundColor: "#318AC7",
    fontSize: 30,
    color: "#FFF",
    fontFamily: "Fregata-Sans",
  },
  sectionContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 11,
    paddingHorizontal: 24,
  },
  socialsWrapper: {
    fontFamily: "FjallaOne",
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

