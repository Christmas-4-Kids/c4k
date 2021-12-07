import React, { useState, useEffect } from "react"
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity } from "react-native"
import { useStyles } from "../context/styles.context"
import firestore from "firebase/firestore"
import { fetchSchedule } from "../services/firestore.service"
import ScreenWrapper from "./ScreenWrapper"
 
export const Schedule = props => {
  const { styles } = useStyles()

  const [schedule, setSchedule] = useState(null)

  useEffect(() => {
    fetchSchedule().then(data => {
      setSchedule(data.data[0].events)
      console.log("here is the schedule",data.data[0].events)
    })
  }, [])

  useEffect(() => {
    let list = []
    // const unsubscribe = firestore()
    //   .collection("schedule")
    //   .onSnapshot({
    //     error: (e) => console.error(e),
    //     next: (querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         let d = doc.data();
    //         d.id = doc.id;
    //         d.events.sort((event) => event.order);
    //         list.push(d);
    //       });
    //       setSchedule(list[0]);
    //     },
    //   });
    // return () => {
    //   unsubscribe();
    // };
  }, [])
  return (
    <ScreenWrapper>
      <View style={styles.sectionContainer}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
          {!!schedule &&
            schedule.map(event => (
              <View style={styles.sectionContainer} key={event.order}>
                <Text style={styles.sectionTitle}>{event.time}</Text>
                <Text style={styles.sectionDescription}>{event.name}</Text>
              </View>
            ))}
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}
