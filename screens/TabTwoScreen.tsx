import * as React from "react"
import { StyleSheet } from "react-native"
import { C4kText } from "../components/C4kText"

import EditScreenInfo from "../components/EditScreenInfo"
import { Text, View } from "../components/Themed"

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <C4kText style={styles.title}>Tab Two</C4kText>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})
