import React, { useState, useEffect } from "react"
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity } from "react-native"
import styles from "../styles"
import firestore from "firebase/firestore"

const Schedule = props => {
  const [schedule, setSchedule] = useState(null)
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
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
          {!!schedule &&
            schedule.events.map(event => (
              <View style={styles.sectionContainer} key={event.order}>
                <Text style={styles.sectionTitle}>{event.time}</Text>
                <Text style={styles.sectionDescription}>{event.name}</Text>
              </View>
            ))}
        </ScrollView>
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => props.navigation.pop()}>
            <Text style={styles.buttonText}> Close </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Schedule
