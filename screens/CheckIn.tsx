import React from "react"
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from "react-native"
import { C4kText } from "../components/C4kText"
import { useStyles } from "../context/styles.context"
import { useUser } from "../context/user.context"

const CheckIn = props => {
  const { user, setUser } = useUser()
  const { styles } = useStyles()
  console.log(user)
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={{ flex: 1 }}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={() => props.navigation.pop()}>
                <C4kText style={styles.buttonText}> Close </C4kText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CheckIn
