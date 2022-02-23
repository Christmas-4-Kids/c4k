import React from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { C4kText } from "../components/C4kText"
import { useStyles } from "../context/styles.context"
import { useUser } from "../context/user.context"

const UserInfo = props => {
  const { user, setUser } = useUser()
  const { styles } = useStyles()
  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <C4kText style={styles.sectionTitle}>User Information</C4kText>
      </View>
      <View style={styles.sectionContainer}>
        <C4kText style={styles.sectionText}>Name</C4kText>
        <C4kText style={styles.sectionTitle}>
          {user.firstName} {user.lastName}
        </C4kText>
      </View>
      <View style={styles.sectionContainer}>
        <C4kText style={styles.sectionText}>Email</C4kText>
        <C4kText style={styles.sectionTitle}>{user.email}</C4kText>
      </View>
      <View style={styles.sectionContainer}>
        <C4kText style={styles.sectionText}>Phone</C4kText>
        <C4kText style={styles.sectionTitle}>{user.phone}</C4kText>
      </View>

      <View style={styles.sectionContainer}>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("UserEditPage")}>
          <C4kText style={styles.buttonText}> Edit </C4kText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserInfo
