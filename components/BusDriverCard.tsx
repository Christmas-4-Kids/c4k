import React, { useState, useEffect } from "react"
import { View, Text, Modal, TextInput, NativeSyntheticEvent, TextInputChangeEventData, Pressable, Image, Platform } from "react-native"
import { Entypo, Ionicons } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import { Card } from "./Card"
import { useStyles } from "../context/styles.context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import c4kBus from "../assets/images/C4K-Bus.png"
import { C4kText } from "./C4kText"

export const BusDriverCard = () => {
  const [busDriverModalOpen, setBusDriverModalOpen] = useState(false)
  const [driverName, setDriverName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [busNumber, setBusNumber] = useState("")

  const { styles } = useStyles()

  const storeDriverInfo = async busDriver => {
    try {
      const jsonValue = JSON.stringify(busDriver)
      await AsyncStorage.setItem("driverInfo", jsonValue)
    } catch (e) {
      alert(e)
    }
  }

  const getDriverInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("driverInfo")
      const driverInfo = JSON.parse(jsonValue)

      if (driverInfo !== null) {
        setDriverName(driverInfo.driverName)
        setPhoneNumber(driverInfo.phoneNumber)
        setBusNumber(driverInfo.busNumber)
      }
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    getDriverInfo()
  }, [])

  return (
    <Card overrideStyles={styles.busDriverCard}>
      <View>
        <View style={styles.busDriverCardHeader}>
          <C4kText style={{ fontSize: 35, color: "#FFF", fontFamily: "Fregata-Sans", textAlign: "left", lineHeight: 30, paddingRight: 5 }}>bus driver</C4kText>
          <Entypo name="squared-plus" size={24} color="#EF364B" onPress={() => setBusDriverModalOpen(true)} />
        </View>
        <View style={styles.busDriverCardInfo}>
          <View style={styles.busNumberBox}>
            <C4kText style={styles.busTitleText}>BUS</C4kText>
            <C4kText style={[styles.busNumberText, { marginTop: Platform.OS === "ios" ? -10 : 0 }]}>{busNumber}</C4kText>
          </View>
          <View style={styles.busDriverInfo}>
            <C4kText style={styles.busDriverNameText}>{driverName !== "" ? driverName : "Driver Name"}</C4kText>
            <C4kText style={styles.busDriverPhoneText}>{phoneNumber !== "" ? phoneNumber : "Phone"}</C4kText>
          </View>
        </View>
      </View>
      <View>
        <Image
          source={c4kBus}
          style={{
            width: 182,
            height: 145,
            marginTop: -36,
          }}
        />
      </View>
      <View>
        <Modal
          visible={busDriverModalOpen}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setBusDriverModalOpen(!busDriverModalOpen)
          }}
        >
          <View
            style={{
              flex: 1,
              marginTop: 110,
            }}
          >
            <View style={styles.card}>
              <FontAwesome name="window-close" size={24} color="#EF364B" onPress={() => setBusDriverModalOpen(false)} style={{ textAlign: "right" }} />

              <C4kText
                style={{
                  color: "#1B2C39",
                  fontFamily: "FjallaOne",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Add Bus Driver Information
              </C4kText>
              <View style={styles.textInputView}>
                <Ionicons name="md-person-sharp" style={styles.textInputIcon} />
                <TextInput
                  style={styles.textInput}
                  onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setDriverName(e.nativeEvent.text)}
                  placeholder=" driver's name"
                  value={driverName}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  autoFocus={true}
                />
              </View>
              <View style={styles.textInputView}>
                <Ionicons name="call" style={styles.textInputIcon} />
                <TextInput
                  style={styles.textInput}
                  onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setPhoneNumber(e.nativeEvent.text)}
                  placeholder=" phone number"
                  value={phoneNumber}
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  returnKeyLabel="next"
                />
              </View>
              <View style={styles.textInputView}>
                <Ionicons name="bus" style={styles.textInputIcon} />
                <TextInput
                  style={styles.textInput}
                  onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setBusNumber(e.nativeEvent.text)}
                  placeholder=" bus #"
                  value={busNumber}
                  keyboardType="phone-pad"
                  returnKeyType="done"
                  returnKeyLabel="done"
                />
              </View>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
                onPress={() => {
                  storeDriverInfo({ driverName, phoneNumber, busNumber })
                  setBusDriverModalOpen(false)
                }}
              >
                <C4kText style={styles.buttonText}>{"Save Driver Info"}</C4kText>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </Card>
  )
}
