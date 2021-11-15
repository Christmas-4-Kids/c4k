import React from "react"
import { View } from "react-native"
import { useStyles } from "../context/styles.context"

export const Card = ({ children, styles: overrideStyles }) => {
  const { styles } = useStyles()
  const cardStyles = { ...styles.card, overrideStyles }

  return <View style={cardStyles}>{children}</View>
}
