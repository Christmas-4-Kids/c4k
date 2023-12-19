import React, { useEffect, useState } from "react"
import { TouchableOpacity, Image, View } from "react-native"
import { useStyles } from "../context/styles.context"
import ScreenWrapper from "./ScreenWrapper"
import { SearchFilters } from "../types"
import ChaperoneSearchCard from "../components/ChaperoneSearchCard"
import { syncMailchimpVolunteers } from "../services/firestore.service"
import ChaperoneListCard from "../components/ChaperoneListCard"
import { useVolunteers, Volunteer } from "../context/volunteer.context"
import { C4kText } from "../components/C4kText"

export const ChaperoneList = ({ navigation }) => {
  const { styles } = useStyles()
  const { volunteers } = useVolunteers()
  const [searchName, setSearchName] = useState("")
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    lebanon: false,
    evening: false,
    allDay: false,
    sunday: false,
    admin: false,
    driver: false,
    checkedIn: false,
    notCheckedIn: false,
    espanol: false,
    medical: false,
  })
  const [filteredVolunteers, setFilteredVolunteers] = useState(volunteers)
  const onSyncPress = async () => {
    await syncMailchimpVolunteers()
  }

  const filterVolunteerType = (volunteerType: string, searchFilters: SearchFilters) => {
    const volunteerTypesToFilter = []
    const useChaperoneFilters = searchFilters.allDay || searchFilters.evening || searchFilters.lebanon || searchFilters.sunday || searchFilters.admin || searchFilters.driver
    if (!useChaperoneFilters) return true

    if (searchFilters.allDay) {
      volunteerTypesToFilter.push("2023_ALL_DAY_CHAPERONE")
    }
    if (searchFilters.evening) {
      volunteerTypesToFilter.push("2023_EVENING_CHAPERONE")
    }
    if (searchFilters.lebanon) {
      volunteerTypesToFilter.push("2023_LEBANON_CHAPERONE")
    }
    if (searchFilters.sunday) {
      volunteerTypesToFilter.push("2023_SUNDAY_CHAPERONE")
    }
    if (searchFilters.admin) {
      volunteerTypesToFilter.push("2023_ADMIN")
    }
    if (searchFilters.driver) {
      volunteerTypesToFilter.push("2023_DRIVER")
    }
    return volunteerTypesToFilter.includes(volunteerType)
  }

  const filterCheckedIn = (checkedIn: boolean, searchFilters: SearchFilters) => {
    const seeCheckedIn = searchFilters.checkedIn
    const seeNotCheckedIn = searchFilters.notCheckedIn
    if (seeCheckedIn && seeNotCheckedIn) {
      return true
    } else if (seeCheckedIn && !seeNotCheckedIn) {
      return checkedIn ? true : false
    } else if (!seeCheckedIn && seeNotCheckedIn) {
      return checkedIn ? false : true
    }
    return true
  }

  const filterOther = (volunteer: Volunteer, searchFilters: SearchFilters) => {
    const isMedical = volunteer.medical !== "None"
    const isSpanish = volunteer.spanish === "Yes"
    const seeMedical = searchFilters.medical
    const seeSpanish = searchFilters.espanol

    if (seeMedical && seeSpanish) {
      return isMedical && isSpanish
    } else if (seeMedical && !seeSpanish) {
      return isMedical
    } else if (!seeMedical && seeSpanish) {
      return isSpanish
    }
    return true
  }

  useEffect(() => {
    const newFilteredVolunteers = volunteers.filter((v) => {
      const useSearch = searchName.length >= 2
      if (useSearch) {
        return (
          filterVolunteerType(v.volunteerType, searchFilters) && filterCheckedIn(v.checkedIn, searchFilters) && filterOther(v, searchFilters) && v.fullName.includes(searchName)
        )
      } else {
        return filterVolunteerType(v.volunteerType, searchFilters) && filterCheckedIn(v.checkedIn, searchFilters) && filterOther(v, searchFilters)
      }
    })
    setFilteredVolunteers(newFilteredVolunteers)
  }, [
    searchName,
    searchFilters.admin,
    searchFilters.allDay,
    searchFilters.checkedIn,
    searchFilters.driver,
    searchFilters.espanol,
    searchFilters.evening,
    searchFilters.lebanon,
    searchFilters.sunday,
    searchFilters.medical,
    searchFilters.notCheckedIn,
    volunteers,
  ])

  return (
    <View style={styles.page}>
      <View style={styles.stickyHeader}></View>
      <ChaperoneSearchCard searchName={searchName} setSearchName={setSearchName} searchFilters={searchFilters} setSearchFilters={setSearchFilters} />
      <View style={{ paddingHorizontal: 35, flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={onSyncPress}>
          <View style={styles.upcomingEventButton}>
            <C4kText style={styles.upcomingEventButtonText}>Sync</C4kText>
          </View>
        </TouchableOpacity>
        <C4kText style={styles.searchResultCountText}>
          {filteredVolunteers.length} OF {volunteers.length}
        </C4kText>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <View style={styles.upcomingEventButton}>
            <C4kText style={styles.upcomingEventButtonText}>Scan</C4kText>
          </View>
        </TouchableOpacity>
      </View>
      <ChaperoneListCard volunteers={filteredVolunteers} />
    </View>
  )
}
