import React from "react"
import { View, Text, Pressable, Image } from "react-native"
import { useUser } from "../context/user.context"
import logo from "../assets/images/c4k-logo.png"
import { useStyles } from "../context/styles.context"
import UserCard from "../components/UserCard"

const hardCodedUser = {
  user: "Robbie Green",
  role: "Chaperone",
  phone: "(615) 601-5046",
  email: "imrobbiegreen@gmail.com",
}

export const Account = () => {
  const { styles } = useStyles()
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
        <UserCard
          user={hardCodedUser.user}
          role={hardCodedUser.role}
          phone={hardCodedUser.phone}
          email={hardCodedUser.email}
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
