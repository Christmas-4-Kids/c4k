import React from "react"
import { useStyles } from "../context/styles.context"
import { View, Linking, Pressable, Text } from "react-native"

const UpcomingEvent = ({ month, day, title, description, buttonText, buttonUrl }) => {
  const { styles } = useStyles()

  const openLink = () => {
    Linking.openURL(buttonUrl)
  }

  return (
    <View style={styles.upcomingEventContainer}>
      <View style={styles.upcomingEventBox}>
        <Text style={styles.upcomingEventMonth}>{month}</Text>
        <Text style={styles.upcomingEventDay}>{day}</Text>
      </View>
      <View style={styles.upcomingEventDetailsContainer}>
        <Text style={styles.upcomingEventTitle}>{title}</Text>
        <Text style={styles.upcomingEventDescription}>{description}</Text>
      </View>
      <Pressable onPress={openLink}>
        <View style={styles.upcomingEventButton}>
          <Text style={styles.upcomingEventButtonText}>{buttonText}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default UpcomingEvent
