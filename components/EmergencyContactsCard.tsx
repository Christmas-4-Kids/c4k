import React from "react"
import { View, Text, Linking } from "react-native"
import { Card } from "./Card"
import { useStyles } from "../context/styles.context"
import { FontAwesome5 } from "@expo/vector-icons"
import { C4kText } from "./C4kText"

export const EmergencyContactsCard = () => {
  const { styles } = useStyles()
  return (
    <Card overrideStyles={styles.emergencyContactsCard}>
      <View style={styles.emergencyContactsHeader}>
        <C4kText
          style={{
            fontSize: 25,
            color: "#FFF",
            fontFamily: "Fregata-Sans",
            lineHeight: 15,
            textAlign: "center",
            width: "70%",
            paddingTop: 10,
            flexWrap: "wrap",
          }}
        >
          emergency contacts
        </C4kText>
      </View>
      <View style={styles.emergencyContactsCardBody}>
        <View style={styles.emergencyContactRow}>
          <View style={styles.emergencyContact}>
            <C4kText style={styles.emergencyContactNameText}>Linda O’Connell</C4kText>
            <C4kText style={styles.emergencyContactTitleText}>C4K President</C4kText>
          </View>
          <FontAwesome5
            name="phone-alt"
            size={8}
            color="#FFF"
            style={{ backgroundColor: "#23A57F", borderRadius: 3, padding: 5, margin: 5 }}
            onPress={() => Linking.openURL("tel://6153478659")}
          />
        </View>

        <View style={styles.emergencyContactDivider}></View>
        <View style={styles.emergencyContactRow}>
          <View style={styles.emergencyContact}>
            <C4kText style={styles.emergencyContactNameText}>Elisha Payne</C4kText>
            <C4kText style={styles.emergencyContactTitleText}>All Day Coordinator</C4kText>
          </View>
          <FontAwesome5
            name="phone-alt"
            size={8}
            color="#FFF"
            style={{ backgroundColor: "#23A57F", borderRadius: 3, padding: 5, margin: 5 }}
            onPress={() => Linking.openURL("tel://6156813471")}
          />
        </View>
        <View style={styles.emergencyContactDivider}></View>
        <View style={styles.emergencyContactRow}>
          <View style={styles.emergencyContact}>
            <C4kText style={styles.emergencyContactNameText}>DeAnne Redman</C4kText>
            <C4kText style={styles.emergencyContactTitleText}>Evening Coordinator</C4kText>
          </View>
          <FontAwesome5
            name="phone-alt"
            size={8}
            color="#FFF"
            style={{ backgroundColor: "#23A57F", borderRadius: 3, padding: 5, margin: 5 }}
            onPress={() => Linking.openURL("tel://6155196199")}
          />
        </View>
      </View>
    </Card>
  )
}
