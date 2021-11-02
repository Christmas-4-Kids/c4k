import React from "react"
import { View, StyleSheet, Text, Pressable, Image } from "react-native"
import { useUser } from "../context/user.context"
import logo from "../assets/images/c4k-logo.png"
import { useStyles } from "../context/styles.context"

export const Account = () => {
  const styles = useStyles().styles
  const { signOut } = useUser()

  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <Image
          source={logo}
          style={{
            width: 180,
            height: 180,
            alignSelf: "center",
            marginBottom: 100,
          }}
        />
        <View style={styles.sectionContainer}>
          <Pressable style={styles.button} onPress={signOut}>
            <Text style={styles.buttonText}>{"SIGN OUT"}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
