import { StackScreenProps } from "@react-navigation/stack"
import * as React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useStyles } from "../context/styles.context"

import { RootStackParamList } from "../types"

export default function NotFoundScreen({ navigation }: StackScreenProps<RootStackParamList, "NotFound">) {
  const { styles } = useStyles()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace("Root")} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  )
}
