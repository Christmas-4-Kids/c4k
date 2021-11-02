import React from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { useStyles } from "../context/styles.context"
import { useUser } from "../context/user.context"

const UserInfo = (props) => {
  const { user, setUser } = useUser()
  const styles = useStyles().styles
  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>User Information</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>Name</Text>
        <Text style={styles.sectionTitle}>
          {user.firstName} {user.lastName}
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>Email</Text>
        <Text style={styles.sectionTitle}>{user.email}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>Phone</Text>
        <Text style={styles.sectionTitle}>{user.phone}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("UserEditPage")}
        >
          <Text style={styles.buttonText}> Edit </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserInfo
