import moment from "moment"
import { useState, useEffect } from "react"
import React from "react"
import { View, Text } from "react-native"
import { useStyles } from "../context/styles.context"
import { Card } from "./Card"
import { useUser } from "../context/user.context"

export const Countdown = () => {
  const { styles } = useStyles()
  const { user } = useUser()

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

  return (
    <Card>
      <Text style={styles.countdownCardTitle}>{user?.firstName}, Get Ready to Shop In:</Text>

      <View style={styles.countdownItemsWrapper}>
        {!!daysLeft ? (
          <View style={styles.countdownItem}>
            <Text style={styles.countdownTime}>{daysLeft} </Text>
            <View style={styles.countdownItemDivider}></View>
            <Text style={styles.countdownLabel}>days</Text>
          </View>
        ) : null}
        {!!hoursLeft ? (
          <View style={styles.countdownItem}>
            <Text style={styles.countdownTime}>{hoursLeft} </Text>
            <View style={styles.countdownItemDivider}></View>
            <Text style={styles.countdownLabel}>hours</Text>
          </View>
        ) : null}
        {!!minutesLeft ? (
          <View style={styles.countdownItem}>
            <Text style={styles.countdownTime}>{minutesLeft} </Text>
            <View style={styles.countdownItemDivider}></View>
            <Text style={styles.countdownLabel}>minutes</Text>
          </View>
        ) : null}

        <View style={styles.countdownItem}>
          <Text style={styles.countdownTime}>{secondsLeft} </Text>
          <View style={styles.countdownItemDivider}></View>
          <Text style={styles.countdownLabel}>seconds</Text>
        </View>
      </View>
    </Card>
  )
}
