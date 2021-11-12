import React from "react"
import { View, Text, Pressable, Image, TouchableOpacity } from "react-native"
import { useUser } from "../context/user.context"
import logo from "../assets/images/c4k-logo.png"
import { useStyles } from "../context/styles.context"
import UserCard from "../components/UserCard"
import { Entypo } from "@expo/vector-icons"
import ScreenWrapper from "./ScreenWrapper"

const hardCodedUser = {
  user: "Robbie Green",
  role: "Chaperone",
  phone: "(615) 601-5046",
  email: "imrobbiegreen@gmail.com",
}

export const Account = () => {
  const { styles } = useStyles()
  const { signOut, user } = useUser()
  console.log(`user`, user)
  return (
    <ScreenWrapper>
      <UserCard user={`${user.firstName} ${user.lastName}`} role={hardCodedUser.role} phone={user.phoneNumber} email={user.email} />
      <TouchableOpacity onPress={signOut}>
        <View style={styles.signOut}>
          <Text style={styles.signOutText}>Sign Out&nbsp;&nbsp;</Text>
          <Entypo name="log-out" size={14} color="#808080" />
        </View>
      </TouchableOpacity>
    </ScreenWrapper>
  )
}
