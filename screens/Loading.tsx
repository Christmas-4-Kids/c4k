import React from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

export function Loading() {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#EF334C" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    position: "absolute",
    left: 0,
    right: 0,
    top: 350,
    zIndex: 999,
  },
})
