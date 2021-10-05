import React from "react"
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from "react-native"
import styles from "../styles"
import { useUser } from "../context/user.context"

const CheckIn = props => {
  const { user, setUser } = useUser()
  console.log(user)
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={{ flex: 1 }}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={() => props.navigation.pop()}>
                <Text style={styles.buttonText}> Close </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CheckIn
