import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useUser } from "../context/user.context"
import { useStyles } from "../context/styles.context"
import UserCard from "../components/UserCard"
import { Entypo } from "@expo/vector-icons"
import ScreenWrapper from "./ScreenWrapper"
import { C4kText } from "../components/C4kText"

const getVolunteerType = (volunteerType: string) => {
  switch (volunteerType) {
    case "2022_ADMIN":
      return "Organizer"
    case "2022_ALL_DAY_CHAPERONE":
    case "2022_EVENING_CHAPERONE":
    case "2022_LEBANON_CHAPERONE":
      return "Chaperone"
    case "2022_DRIVER":
      return "Driver"
    default:
      return "Unknown"
  }
}

export const Account = () => {
  const { styles } = useStyles()
  const { signOut, user } = useUser()
  return (
    <ScreenWrapper>
      <UserCard user={`${user.firstName} ${user.lastName}`} role={getVolunteerType(user.volunteerType)} phone={user.phoneNumber} email={user.email} />
      <TouchableOpacity onPress={signOut}>
        <View style={styles.signOut}>
          <C4kText style={styles.signOutText}>Sign Out&nbsp;&nbsp;</C4kText>
          <Entypo name="log-out" size={14} color="#808080" />
        </View>
      </TouchableOpacity>
    </ScreenWrapper>
  )
}
