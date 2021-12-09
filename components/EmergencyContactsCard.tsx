import React, { useState, useEffect } from "react"
 import {
   View,
   Text,
   Pressable,
   Linking,
 } from "react-native"
 import { Card } from "./Card"
 import { Entypo } from "@expo/vector-icons"
 import { useStyles } from "../context/styles.context"
 import { FontAwesome } from "@expo/vector-icons"
 import { FontAwesome5 } from "@expo/vector-icons"
 import AsyncStorage from "@react-native-async-storage/async-storage"

 export const EmergencyContactsCard = () => {
  
   const [emergencyContactList, setemergencyContactList] = useState([])

   const { styles } = useStyles()

   const pressCall = () => {
    const url = `tel://`
    Linking.openURL(url)
  }
  return (
       <Card overrideStyles={styles.emergencyContactsCard}>
         <View style={styles.emergencyContactsHeader}>
           <Text
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
             Emergency Contacts
           </Text>
     
         </View>
         <View style={styles.emergencyContactsCardBody}>
 
             <View style={styles.emergencyContactRow}>
                 <View style={styles.emergencyContact}>

             <Text style={styles.emergencyContactNameText}>Linda O’Connell</Text>
             <Text style={styles.emergencyContactTitleText}>C4K President</Text>
             </View>
             <FontAwesome5
               name="phone-alt"
               size={8}
               color="#FFF"
               style={{ backgroundColor: "#23A57F", borderRadius: 3, padding: 5 }}
               onPress={() => Linking.openURL('tel://6153478659')}
             />
             </View>

            <View
                style={styles.emergencyContactDivider}
            ></View>
            <View style={styles.emergencyContactRow}>
                <View style={styles.emergencyContact}>

            <Text style={styles.emergencyContactNameText}>Elisha Payne</Text>
            <Text style={styles.emergencyContactTitleText}>All Day Chaperone Coordinator</Text>
                </View>
             <FontAwesome5
               name="phone-alt"
               size={8}
               color="#FFF"
               style={{ backgroundColor: "#23A57F", borderRadius: 3, padding: 5 }}
               onPress={() => Linking.openURL('tel://6156813471')}
             />
             </View>
             <View
                style={styles.emergencyContactDivider}
            ></View>
            <View style={styles.emergencyContactRow}>
                <View style={styles.emergencyContact}>

            <Text style={styles.emergencyContactNameText}>DeAnne Redman</Text>
            <Text style={styles.emergencyContactTitleText}>Evening Chaperone Coordinator</Text>
            </View>
             <FontAwesome5
               name="phone-alt"
               size={8}
               color="#FFF"
               style={{ backgroundColor: "#23A57F", borderRadius: 3, padding: 5 }}
               onPress={() => Linking.openURL('tel://6155196199')}
             />
             </View>
             <View
                style={styles.emergencyContactDivider}
            ></View>
            
        </View>
       </Card>
   
   )
 }