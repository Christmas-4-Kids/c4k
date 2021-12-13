import { StackScreenProps } from "@react-navigation/stack"
import * as React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { C4kText } from "../components/C4kText"
import { useStyles } from "../context/styles.context"

import { RootStackParamList } from "../types"

export default function NotFoundScreen({ navigation }: StackScreenProps<RootStackParamList, "NotFound">) {
  const { styles } = useStyles()
  return (
    <View style={styles.container}>
      <C4kText style={styles.title}>This screen doesn't exist.</C4kText>
      <TouchableOpacity onPress={() => navigation.replace("Root")} style={styles.link}>
        <C4kText style={styles.linkText}>Go to home screen!</C4kText>
      </TouchableOpacity>
    </View>
  )
}
