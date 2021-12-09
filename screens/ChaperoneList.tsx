import React, { useEffect, useState } from "react"
import { TouchableOpacity, Text, View } from "react-native"
import { useStyles } from "../context/styles.context"
import ScreenWrapper from "./ScreenWrapper"
import { SearchFilters } from "../types"
import ChaperoneSearchCard from "../components/ChaperoneSearchCard"
import { syncMailchimpVolunteers } from "../services/firestore.service"
import ChaperoneListCard from "../components/ChaperoneListCard"
import { useVolunteers, Volunteer } from "../context/volunteer.context"

const getVolunteerType = (volunteerType: string) => {
  switch (volunteerType) {
    case "2021_ADMIN":
      return "Organizer"
    case "2021_ALL_DAY_CHAPERONE":
    case "2021_EVENING_CHAPERONE":
    case "2021_LEBANON_CHAPERONE":
      return "Chaperone"
    case "2021_DRIVER":
      return "Driver"
    default:
      return "Unknown"
  }
}

export const ChaperoneList = ({ navigation }) => {
  const { styles } = useStyles()
  const { volunteers } = useVolunteers()
  const [searchName, setSearchName] = useState("")
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    lebanon: false,
    evening: false,
    allDay: false,
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
    const useChaperoneFilters = searchFilters.allDay || searchFilters.evening || searchFilters.lebanon || searchFilters.admin || searchFilters.driver
    if (!useChaperoneFilters) return true

    if (searchFilters.allDay) {
      volunteerTypesToFilter.push("2021_ALL_DAY_CHAPERONE")
    }
    if (searchFilters.evening) {
      volunteerTypesToFilter.push("2021_EVENING_CHAPERONE")
    }
    if (searchFilters.lebanon) {
      volunteerTypesToFilter.push("2021_LEBANON_CHAPERONE")
    }
    if (searchFilters.admin) {
      volunteerTypesToFilter.push("2021_ADMIN")
    }
    if (searchFilters.driver) {
      volunteerTypesToFilter.push("2021_DRIVER")
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
    const newFilteredVolunteers = volunteers.filter(v => {
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
    searchFilters.medical,
    searchFilters.notCheckedIn,
    volunteers,
  ])

  return (
    <ScreenWrapper>
      <ChaperoneSearchCard searchName={searchName} setSearchName={setSearchName} searchFilters={searchFilters} setSearchFilters={setSearchFilters} />
      <View style={{ paddingHorizontal: 35, flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={onSyncPress}>
          <View style={styles.upcomingEventButton}>
            <Text style={styles.upcomingEventButtonText}>Sync</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.searchResultCountText}>
          {filteredVolunteers.length} OF {volunteers.length}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <View style={styles.upcomingEventButton}>
            <Text style={styles.upcomingEventButtonText}>Check In</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ChaperoneListCard volunteers={filteredVolunteers} />
    </ScreenWrapper>
  )
}
