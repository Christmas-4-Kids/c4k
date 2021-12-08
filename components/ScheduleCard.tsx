import React from "react"
import { useStyles } from "../context/styles.context"
import { Text, View, Image } from "react-native"
import { Entypo } from "@expo/vector-icons"

const textStyle = {
  color: "white",
  fontFamily: "inherit",
}

export const ScheduleCard = (event) => {
  const { styles } = useStyles()

  if (!event.data.volunteerTypes.includes(event.volunteerType)) {
    return null
  } else
    return (
      <View style={styles.scheduleCardWrapper}>
        <View style={styles.scheduleTime}>
          <Text style={textStyle}>{event.data.time}</Text>
        </View>
        <View style={styles.scheduleName}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...textStyle, paddingVertical: "auto", width: 22 }}>
              {event.data.icon}
            </Text>
            <Text style={textStyle}>{event.data.name}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo
              name="location"
              size={16}
              color="#EF364B"
              style={{ width: 22 }}
            />
            <Text style={textStyle}>{event.data.location}</Text>
          </View>
        </View>
      </View>
    )
}
