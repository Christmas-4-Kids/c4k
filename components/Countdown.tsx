import moment from "moment"
import { useState, useEffect } from "react"
import React from "react"
import { View, Text } from "react-native"
import { useStyles } from "../context/styles.context"
import { Card } from "./Card"

export const Countdown = () => {
  const timeTillDate = "12 14 2021, 9:00 am"
  const timeFormat = "MM DD YYYY, hh:mm a"
  const [daysLeft, setDaysLeft] = useState("")
  const [hoursLeft, setHoursLeft] = useState("")
  const [minutesLeft, setMinutesLeft] = useState("")
  const [secondsLeft, setSecondsLeft] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      const eventDateTime: any = moment(timeTillDate, timeFormat)
      const now: any = moment()

      // Moment Duration object
      const timeBeforeEvent = moment.duration(eventDateTime.diff(now))

      // Duration broken down - days includes total days for months left too
      const days = eventDateTime.diff(now, "days")
      const hours = timeBeforeEvent.get("hours").toString()
      const minutes = timeBeforeEvent.get("minutes").toString()
      const seconds = timeBeforeEvent.get("seconds").toString()

      setDaysLeft(days)
      setHoursLeft(hours)
      setMinutesLeft(minutes)
      setSecondsLeft(seconds)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const { styles } = useStyles()

  return (
    <Card>
      <Text style={{ fontFamily: "FjallaOne", fontSize: 16 }}>Get Ready to Shop In:</Text>

      <View style={styles.countdownItemWrapper}>
        {daysLeft && (
          <View style={styles.countdownItem}>
            <Text style={styles.countdownTime}>{daysLeft} </Text>
            <Text style={styles.countdownLabel}>days</Text>
          </View>
        )}
        {hoursLeft && (
          <View style={styles.countdownItem}>
            <Text style={styles.countdownTime}>{hoursLeft} </Text>
            <Text style={styles.countdownLabel}>hours</Text>
          </View>
        )}
        {minutesLeft && (
          <View style={styles.countdownItem}>
            <Text style={styles.countdownTime}>{minutesLeft} </Text>
            <Text style={styles.countdownLabel}>minutes</Text>
          </View>
        )}

        <View style={styles.countdownItem}>
          <Text style={styles.countdownTime}>{secondsLeft} </Text>
          <Text style={styles.countdownLabel}>seconds</Text>
        </View>
      </View>
    </Card>
  )
}
