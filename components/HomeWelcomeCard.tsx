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
            Thank you for volunteering with Christmas 4 Kids! Without YOU none of this would be possible. Today will be stressful. Today will be full of highs and lows,
            heart-warming children and heart-breaking stories. Soak it all in. Never forget that we're here for the kids - all the other stuff doesn't matter. And remember, Santa's
            always watching!
          </Text>
        </View>
      </View>
    </Card>
  )
}
