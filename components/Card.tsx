import React from "react"
import { View } from "react-native"
import { useStyles } from "../context/styles.context"

export const Card = ({ children, overrideStyles }) => {
  const { styles } = useStyles()

  return <View style={overrideStyles ?? styles.card}>{children}</View>
}
