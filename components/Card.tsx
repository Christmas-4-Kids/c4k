import React from "react"
import { View } from "react-native"
import { useStyles } from "../context/styles.context"

interface CardProps {
  children: any
  overrideStyles?: any
}

export const Card = ({ children, overrideStyles }: CardProps) => {
  const { styles } = useStyles()

  return <View style={overrideStyles ?? styles.card}>{children}</View>
}
