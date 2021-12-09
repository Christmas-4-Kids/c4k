import React, { useState, useEffect } from "react"
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity } from "react-native"
import { Card } from "../components/Card"
import { useStyles } from "../context/styles.context"
import firestore from "firebase/firestore"
import { fetchSchedule } from "../services/firestore.service"
import ScreenWrapper from "./ScreenWrapper"
import { ScheduleCard } from "../components/ScheduleCard"
import { useUser } from "../context/user.context"
import { Loading } from "./Loading"

export const Schedule = (props) => {
  const { styles } = useStyles()
  const { user } = useUser()
  console.log("volunteerType", user.volunteerType)
  const volunteerType = "ADMIN"

  const [schedule, setSchedule] = useState([])

  useEffect(() => {
    fetchSchedule().then((data) => {
      setSchedule(data.data[0].events)
    })
  }, [])
  return (
    <ScreenWrapper>
      <Card overrideStyles={styles.rulesHeaderCard}>
        <Text style={styles.rulesTabHeader}>Shopping Day Schedule</Text>
        <Text style={styles.rulesTabSubtext}>
          Everything you need to know about being a chaperone on the big
          shopping day.
        </Text>
      </Card>

      <View style={styles.sectionContainer}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {schedule.length > 0 ? (
            schedule.map((event) => (
              <React.Fragment key={event.order}>
                <ScheduleCard data={event} volunteerType={volunteerType} />
              </React.Fragment>
            ))
          ) : (
            <Loading />
          )}
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}
