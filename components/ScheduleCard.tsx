import React from "react"
import { useStyles } from "../context/styles.context"
import { Pressable, Text, View } from "react-native"
import { Entypo } from "@expo/vector-icons"
import { C4kText } from "./C4kText"
import { textVolunteers } from "../services/firestore.service"

export const ScheduleCard = event => {
  const { styles } = useStyles()

  const onClick = () => {
    textVolunteers()
  }

  if (!event.data.volunteerTypes.includes(event.volunteerType)) {
    return null
  } else
    return (
      <View style={styles.scheduleCardWrapper}>
        <View style={styles.scheduleTime}>
          <C4kText style={[styles.scheduleTimeText, { fontSize: 16 }]}>{event.data.time}</C4kText>
        </View>
        <View style={styles.scheduleName}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginBottom: 6,
            }}
          >
            <C4kText style={[styles.scheduleTimeText, { width: 35, textAlign: "left", paddingLeft: 8 }]}>{event.data.icon}</C4kText>
            <C4kText style={styles.scheduleTimeText}>{event.data.name}</C4kText>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-start", marginBottom: 6 }}>
            <C4kText style={{ width: 35, textAlign: "left", paddingLeft: 8 }}>
              <Entypo name="location" size={16} color="#15232E" />
            </C4kText>
            <C4kText style={styles.scheduleTimeText}>{event.data.location}</C4kText>
            <Pressable onPress={onClick}><Text>Text Them</Text></Pressable>
          </View>
        </View>
      </View>
    )
}
