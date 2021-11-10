import React from "react"
import { useStyles } from "../context/styles.context"
import { View, Linking, Pressable } from "react-native"

const UpcomingEvent = ({
  month,
  day,
  title,
  description,
  buttonText,
  buttonUrl,
}) => {
  const { styles } = useStyles()

  const openLink = () => {
    Linking.openURL(buttonUrl)
  }

  return (
    <View style={styles.upcomingEventContainer}>
      <View style={styles.upcomingEventBox}>
        <View style={styles.upcomingEventMonth}>{month}</View>
        <View style={styles.upcomingEventDay}>{day}</View>
      </View>
      <View style={styles.upcomingEventDetailsContainer}>
        <View style={styles.upcomingEventTitle}>{title}</View>
        <View style={styles.upcomingEventDescription}>{description}</View>
      </View>
      <Pressable onPress={openLink}>
        <View style={styles.upcomingEventButton}>
          <View style={styles.upcomingEventButtonText}>{buttonText}</View>
        </View>
      </Pressable>
    </View>
  )
}

export default UpcomingEvent
