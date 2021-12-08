import React from "react"
import { View, Text, Linking, Pressable } from "react-native"
import { HomeWelcomeCard } from "../components/HomeWelcomeCard"
import { BusDriverCard } from "../components/BusDriverCard"
import { ChaperoneGroupCard } from "../components/ChaperoneGroupCard"
import { useStyles } from "../context/styles.context"
import ScreenWrapper from "./ScreenWrapper"
import { EmergencyContactsCard } from "../components/EmergencyContactsCard"

export const Home = () => {
  const openDonateLink = () => {
    Linking.openURL("https://paypal.com/donate/?cmd=_s-xclick&hosted_button_id=ZM6NKQZHSCH2A")
  }
  const { styles } = useStyles()
  return (
    <ScreenWrapper>

      <HomeWelcomeCard/>

      <BusDriverCard />
      <ChaperoneGroupCard/>
      <EmergencyContactsCard/>
    </ScreenWrapper>
  )
}
