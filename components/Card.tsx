import React from "react"
import { View } from "react-native"
import { useStyles } from "../context/styles.context"

export const Card = ({ children }) => {
  const { styles } = useStyles()

  return <View style={styles.card}>{children}</View>
}
