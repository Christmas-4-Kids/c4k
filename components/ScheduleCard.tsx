import React from "react"
import { useStyles } from "../context/styles.context"
import { Text, View } from "react-native"
import { Entypo } from "@expo/vector-icons"

export const ScheduleCard = event => {
  const { styles } = useStyles()

  if (!event.data.volunteerTypes.includes(event.volunteerType)) {
    return null
  } else
    return (
      <View style={styles.scheduleCardWrapper}>
        <View style={styles.scheduleTime}>
          <Text style={[styles.scheduleTimeText, { fontSize: 16 }]}>{event.data.time}</Text>
        </View>
        <View style={styles.scheduleName}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginBottom: 6,
            }}
          >
            <Text style={[styles.scheduleTimeText, { width: 35, textAlign: "left", paddingLeft: 8 }]}>{event.data.icon}</Text>
            <Text style={styles.scheduleTimeText}>{event.data.name}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-start", marginBottom: 6 }}>
            <Text style={{ width: 35, textAlign: "left", paddingLeft: 8 }}>
              <Entypo name="location" size={16} color="#15232E" />
            </Text>
            <Text style={styles.scheduleTimeText}>{event.data.location}</Text>
          </View>
        </View>
      </View>
    )
}
