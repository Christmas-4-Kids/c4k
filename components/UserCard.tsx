import React from "react"
import { Text, View } from "react-native"
import { useStyles } from "../context/styles.context"
import { Card } from "./Card"
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"

const UserCard = ({ user, role, phone, email }) => {
  const { styles } = useStyles()

  return (
    <Card>
      <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: 50 }}>
        <Text style={styles.userCardRegisteredAs}>Registered As:&nbsp;{role}</Text>
        <Text style={styles.userCardName}>{user}</Text>
      </View>
      <View style={styles.userCardDivider}></View>

      <Text style={styles.userCardPhoneEmail}>
        <FontAwesome5 name="phone-alt" size={12} color="#318AC7" />
        &nbsp;&nbsp;{phone}
      </Text>

      <Text style={styles.userCardPhoneEmail}>
        <FontAwesome name="envelope" size={12} color="#318AC7" />
        &nbsp;&nbsp;{email}
      </Text>
    </Card>
  )
}

export default UserCard
