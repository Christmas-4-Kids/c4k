import React from "react"
import { View, StyleSheet, Text, Pressable, Image } from "react-native"
import { useUser } from "../context/user.context"
import logo from "../assets/images/c4k-logo.png"

export const Account = () => {
  const { signOut } = useUser()

  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <Image source={logo} style={{ width: 180, height: 180, alignSelf: "center", marginBottom: 100 }} />
        <View style={styles.sectionContainer}>
          <Pressable style={styles.button} onPress={signOut}>
            <Text style={styles.buttonText}>{"SIGN OUT"}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: "#112430",
    fontFamily: "ZillaSlab-Medium",
  },
  button: {
    backgroundColor: "#EF334C",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontFamily: "ZillaSlab-Medium",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: "#112430",
    marginTop: 20,
    paddingHorizontal: 24,
  },
})
