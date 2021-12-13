import React from "react"
import { useStyles } from "../context/styles.context"
import { View, Linking, Pressable, Text } from "react-native"
import { C4kText } from "./C4kText"

const UpcomingEvent = ({ month, day, title, description, buttonText, buttonUrl }) => {
  const { styles } = useStyles()

  const openLink = () => {
    Linking.openURL(buttonUrl)
  }

  return (
    <View style={styles.upcomingEventContainer}>
      <View style={styles.upcomingEventBox}>
        <C4kText style={styles.upcomingEventMonth}>{month}</C4kText>
        <C4kText style={styles.upcomingEventDay}>{day}</C4kText>
      </View>
      <View style={styles.upcomingEventDetailsContainer}>
        <C4kText style={styles.upcomingEventTitle}>{title}</C4kText>
        <C4kText style={styles.upcomingEventDescription}>{description}</C4kText>
      </View>
      <Pressable onPress={openLink}>
        <View style={styles.upcomingEventButton}>
          <C4kText style={styles.upcomingEventButtonText}>{buttonText}</C4kText>
        </View>
      </Pressable>
    </View>
  )
}

export default UpcomingEvent
