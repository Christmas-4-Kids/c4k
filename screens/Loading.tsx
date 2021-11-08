import React from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { useStyles } from "../context/styles.context"

export function Loading() {
  const { styles } = useStyles()
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#EF334C" />
    </View>
  )
}
