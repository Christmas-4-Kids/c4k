import React, { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { Card } from "../components/Card"
import { useStyles } from "../context/styles.context"
import { fetchSchedule } from "../services/firestore.service"
import ScreenWrapper from "./ScreenWrapper"
import { ScheduleCard } from "../components/ScheduleCard"
import { useUser } from "../context/user.context"
import { Loading } from "./Loading"
import { C4kText } from "../components/C4kText"

export const Schedule = () => {
  const { styles } = useStyles()
  const { user } = useUser()
  const [schedule, setSchedule] = useState([])
  const volunteerType = user.volunteerType.slice(5) //removes 2021_ prefix

  useEffect(() => {
    fetchSchedule().then(data => {
      setSchedule((data as any).data[0].events)
    })
  }, [])
  return (
    <ScreenWrapper>
      <Card overrideStyles={styles.rulesHeaderCard}>
        <C4kText style={styles.rulesTabHeader}>Shopping Day Schedule</C4kText>
        <C4kText style={styles.rulesTabSubtext}>Everything you need to know about being a chaperone on the big shopping day.</C4kText>
      </Card>

      <View>{schedule.length > 0 ? schedule.map((event: any) => <ScheduleCard key={event.order} data={event} volunteerType={volunteerType} />) : <Loading />}</View>
      {/* Added this blank View so that very last rule card displays. it wasn't scrolling down all the way for some reason */}
      <View style={{ height: 110 }}></View>
    </ScreenWrapper>
  )
}
