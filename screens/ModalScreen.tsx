import { StatusBar } from "expo-status-bar"
import * as React from "react"
import { Platform, StyleSheet } from "react-native"

import { Text, View } from "../components/Themed"
import { Landing } from "./Landing"

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Landing />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
