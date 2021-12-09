import React from "react"
import { Card } from "./Card"
import { useStyles } from "../context/styles.context"
import { NativeSyntheticEvent, Platform, Text, TextInput, TextInputChangeEventData, TouchableOpacity, View } from "react-native"
import { SearchFilters } from "../types"
import { Ionicons } from "@expo/vector-icons"

interface ChaperoneSearchCardProps {
  searchName: string
  setSearchName: React.Dispatch<React.SetStateAction<string>>
  searchFilters: SearchFilters
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilters>>
}

const ChaperoneSearchCard = (props: ChaperoneSearchCardProps) => {
  const { styles } = useStyles()
  const { searchName, searchFilters, setSearchName, setSearchFilters } = props
  const searchFilterPills = [
    { name: "lebanon", displayName: "Lebanon" },
    { name: "evening", displayName: "Evening" },
    { name: "allDay", displayName: "All Day" },
    { name: "admin", displayName: "Admin" },
    { name: "driver", displayName: "Driver" },
    { name: "checkedIn", displayName: "Checked In" },
    { name: "notCheckedIn", displayName: "Not Checked In" },
    { name: "espanol", displayName: "Espanol" },
    { name: "medical", displayName: "Medical" },
  ]
  const volunteerPills = searchFilterPills.filter(
    pill => pill.name === "allDay" || pill.name === "evening" || pill.name === "lebanon" || pill.name === "admin" || pill.name === "driver"
  )
  const otherPills = searchFilterPills.filter(
    pill => pill.name !== "allDay" && pill.name !== "evening" && pill.name !== "lebanon" && pill.name !== "admin" && pill.name !== "driver"
  )
  const onFilterPillPress = (name: string) => {
    setSearchFilters(curr => {
      return { ...curr, [name]: !searchFilters[name] }
    })
  }
  return (
    <Card>
      <Text style={[styles.chaperoneSearchCardTitle, { marginTop: Platform.OS === "ios" ? -30 : 0 }]}>volunteer list</Text>
      <Text style={styles.chaperoneSearchCardSubtext}>Use toggles for volunteer filtering.</Text>
      <View style={styles.searchFilterPills}>
        {volunteerPills.map(pill => (
          <TouchableOpacity key={pill.name} onPress={() => onFilterPillPress(pill.name)}>
            <Text style={searchFilters[pill.name] ? styles.searchFilterPillTextOn : styles.searchFilterPillTextOff}>{pill.displayName}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.searchFilterPills}>
        {otherPills.map(pill => (
          <TouchableOpacity key={pill.name} onPress={() => onFilterPillPress(pill.name)}>
            <Text style={searchFilters[pill.name] ? styles.searchFilterPillTextOn : styles.searchFilterPillTextOff}>{pill.displayName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  )
}

export default ChaperoneSearchCard
