import React from "react"
import { Platform, Text, View } from "react-native"
import { useStyles } from "../context/styles.context"
import { Card } from "./Card"
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import { C4kText } from "./C4kText"

const UserCard = ({ user, role, phone, email }) => {
  const { styles } = useStyles()

  return (
    <Card>
      <C4kText style={[styles.userCardRegisteredAs, { marginBottom: Platform.OS === "ios" ? -16 : 0 }]}>Registered As:&nbsp;{role}</C4kText>
      <C4kText style={styles.userCardName}>{user}</C4kText>

      <View style={styles.userCardDivider}></View>

      <C4kText style={styles.userCardPhoneEmail}>
        <FontAwesome5 name="phone-alt" size={12} color="#318AC7" />
        &nbsp;&nbsp;{phone}
      </C4kText>

      <C4kText style={styles.userCardPhoneEmail}>
        <FontAwesome name="envelope" size={12} color="#318AC7" />
        &nbsp;&nbsp;{email}
      </C4kText>
    </Card>
  )
}

export default UserCard
