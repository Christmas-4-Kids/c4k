import React from "react"
import { View, Text } from "react-native"
import { useStyles } from "../context/styles.context"
import { Card } from "./Card"

export const HomeWelcomeCard = () => {
  const { styles } = useStyles()
  return (
    <Card overrideStyles={styles.homeWelcomeCard}>
      <View style={styles.homeWelcomeInnerCard}>
        <View style={{ width: "40%" }}>
          <Text style={styles.welcomeCardHeaderText}> today is the big day</Text>
        </View>
        <View style={styles.welcomeCardBody}>
          <Text style={styles.welcomeCardBodyText}>
            We are so grateful you chose to spend your day helping our C4K children. Today your day will be filled with excitement, love and so many hugs! They need to know we are
            all here just for them! It is their day. Spread your joy and give out all the love you can. Thank you for all you will do today for them....they will never forget this
            day with YOU!
          </Text>
        </View>
      </View>
    </Card>
  )
}
