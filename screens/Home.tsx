import React from "react"
import { View } from "react-native"
import { HomeWelcomeCard } from "../components/HomeWelcomeCard"
import { BusDriverCard } from "../components/BusDriverCard"
import ScreenWrapper from "./ScreenWrapper"
import { EmergencyContactsCard } from "../components/EmergencyContactsCard"
import { ChaperoneGroupCard } from "../components/ChaperoneGroupCard"
import { Button } from "react-native-elements/dist/buttons/Button"
import { updateVolunteerCheckedIn } from "@/services/firestore.service"



export const Home = () => {
  return (
    <ScreenWrapper>
      <HomeWelcomeCard />
      <BusDriverCard />
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <ChaperoneGroupCard />
        <EmergencyContactsCard />
      </View>
    </ScreenWrapper>
  )
}
