import React, { useEffect, useState } from "react"
import { useStyles } from "../context/styles.context"
import { Linking, Modal, Platform, Pressable, Text, TouchableOpacity, View } from "react-native"
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons"
import { Volunteer } from "../context/volunteer.context"
import BigList from "react-native-big-list"
import { updateVolunteerCheckedIn } from "../services/firestore.service"
import { C4kText } from "./C4kText"

const getVolunteerType = (volunteerType: string) => {
  switch (volunteerType) {
    case "2024_ADMIN":
      return "Organizer"
    case "2024_ALL_DAY_CHAPERONE":
      return "All Day Chaperone"
    case "2024_EVENING_CHAPERONE":
      return "Evening Chaperone"
    case "2024_LEBANON_CHAPERONE":
      return "Lebanon Chaperone"
    case "2024_SUNDAY_CHAPERONE":
      return "Sunday Chaperone"
    case "2024_DRIVER":
      return "Driver"
    default:
      return "Unknown"
  }
}

const VolunteerItem = (props: {
  volunteer: Volunteer | null | undefined
  modalVolunteer: Volunteer | null | undefined
  setModalVisible: (modalVisible: boolean) => void
  setModalVolunteer: (volunteer: Volunteer | null | undefined) => void
  styles?: any
}) => {
  const { volunteer, modalVolunteer, setModalVisible, setModalVolunteer, styles } = props
  const isCheckedIn = volunteer?.checkedIn
  const onPress = () => {
    setModalVisible(true)
    setModalVolunteer(volunteer)
  }
  useEffect(() => {
    if (volunteer?.mailchimpMemberId === modalVolunteer?.mailchimpMemberId) {
      setModalVolunteer(volunteer)
    }
  })
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <View style={{ width: 30 }}>
          <C4kText style={isCheckedIn ? styles.volunteerCheckedIn : styles.volunteerNotCheckedIn}>
            {isCheckedIn ? <AntDesign name="checksquare" size={24} color="green" /> : <AntDesign name="checksquare" size={24} color="gray" />}
          </C4kText>
        </View>
        <View style={{ flexDirection: "column", alignItems: "flex-start", width: "68%" }}>
          <C4kText style={styles.chaperoneListItemName}>{`${volunteer?.firstName} ${volunteer?.lastName}`}</C4kText>
          <C4kText style={styles.chaperoneListItemVolunteerType}>{getVolunteerType(volunteer?.volunteerType ?? "")}</C4kText>
        </View>
        <View style={{ flexDirection: "row", alignContent: "flex-end" }}>
          {volunteer?.spanish === "Yes" ? <C4kText style={styles.searchFilterPillTextOn}>Esp</C4kText> : null}
          {volunteer?.medical !== "None" ? <C4kText style={styles.searchFilterPillTextOn}>Med</C4kText> : null}
        </View>
      </View>
      <View style={styles.upcomingEventsCardDivider}></View>
    </TouchableOpacity>
  )
}

interface ChaperoneListCardProps {
  volunteers: Volunteer[]
}

const ChaperoneListCard = (props: ChaperoneListCardProps) => {
  const { styles } = useStyles()
  const { volunteers } = props
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVolunteer, setModalVolunteer] = useState<Volunteer | null>()
  const onCheckInPress = async () => {
    const data = { checkedIn: !modalVolunteer?.checkedIn, refId: modalVolunteer?.mailchimpMemberId }
    await updateVolunteerCheckedIn(data)
    volunteers.push({} as Volunteer)
  }
  const pressCall = (phone: string) => {
    const url = `tel://${phone}`
    Linking.openURL(url)
  }
  return (
    <View style={[styles.chaperoneListCard, { paddingTop: 15 }]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <View style={styles.card}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row", alignContent: "flex-start" }}>
                <C4kText style={modalVolunteer?.checkedIn ? styles.volunteerCheckedIn : styles.volunteerNotCheckedIn}>
                  {modalVolunteer?.checkedIn ? <AntDesign name="checksquare" size={26} color="green" /> : <AntDesign name="checksquare" size={26} color="gray" />}
                </C4kText>
                {modalVolunteer?.spanish === "Yes" ? <C4kText style={styles.searchFilterPillTextOn}>Esp</C4kText> : null}
                {modalVolunteer?.medical !== "None" ? <C4kText style={styles.searchFilterPillTextOn}>Med</C4kText> : null}
              </View>
              <View style={{ marginTop: Platform.OS === "ios" ? -15 : 0 }}>
                <C4kText style={[styles.userCardName]}>{modalVolunteer?.fullName}</C4kText>
              </View>
            </View>
            <C4kText style={[styles.chaperoneListItemVolunteerType, { marginTop: -5 }]}>{getVolunteerType(modalVolunteer?.volunteerType ?? "")}</C4kText>
            <View style={styles.userCardDivider}></View>
            <View style={styles.volunteerCardInfoRow}>
              <C4kText style={styles.volunteerCardInfoText}>
                <Entypo style={{ paddingRight: 10 }} name="location-pin" size={24} color="#1B2C39" />
              </C4kText>
              <View style={{ flexDirection: "column" }}>
                <C4kText style={styles.volunteerCardInfoText}>{`${modalVolunteer?.address?.addr1} ${modalVolunteer?.address?.addr2}`}</C4kText>
                <C4kText style={styles.volunteerCardInfoText}>{`${modalVolunteer?.address?.city}, ${modalVolunteer?.address?.state}`}</C4kText>
              </View>
            </View>
            <TouchableOpacity style={styles.volunteerCardInfoRow} onPress={() => pressCall(modalVolunteer?.phoneNumber ?? "")}>
              <C4kText style={styles.volunteerCardInfoText}>
                <Entypo style={{ paddingRight: 10 }} name="phone" size={24} color="#1B2C39" />
              </C4kText>
              <C4kText style={styles.volunteerCardInfoText}> {modalVolunteer?.phoneNumber}</C4kText>
            </TouchableOpacity>
            <View style={styles.volunteerCardInfoRow}>
              <C4kText style={styles.volunteerCardInfoText}>
                <Entypo style={{ paddingRight: 10 }} name="mail" size={24} color="#1B2C39" />
              </C4kText>
              <C4kText style={styles.volunteerCardInfoText}> {modalVolunteer?.email}</C4kText>
            </View>
            <View style={styles.volunteerCardInfoRow}>
              <C4kText style={styles.volunteerCardInfoText}>
                <FontAwesome5 style={{ paddingRight: 10 }} name="id-card" size={24} color="black" />
              </C4kText>
              <C4kText style={styles.volunteerCardInfoText}> {modalVolunteer?.driversLicense === "" || !modalVolunteer?.driversLicense ? "N/A" : modalVolunteer?.driversLicense}</C4kText>
            </View>
            <View style={styles.volunteerCardInfoRow}>
              <C4kText style={styles.volunteerCardInfoText}>
                <FontAwesome5 style={{ paddingRight: 10 }} name="bus" size={24} color="black" />
              </C4kText>
              <C4kText style={styles.volunteerCardInfoText}> {modalVolunteer?.driver === "" || !modalVolunteer?.driver ? "N/A" : modalVolunteer?.driver}</C4kText>
            </View>
            <View style={styles.volunteerCardInfoRow}>
              <C4kText style={styles.volunteerCardInfoText}>
                <FontAwesome5 style={{ paddingRight: 10 }} name="comment" size={24} color="black" />
              </C4kText>
              <C4kText style={styles.volunteerCardInfoText}> {modalVolunteer?.comments === "" || !modalVolunteer?.comments ? "N/A" : modalVolunteer?.comments}</C4kText>
            </View>
            <Pressable
              style={({ pressed }) => [styles.button, { backgroundColor: modalVolunteer?.checkedIn ? "#C4C4C4" : "#2BA57F", opacity: pressed ? 0.5 : 1 }]}
              onPress={onCheckInPress}
            >
              <C4kText style={styles.buttonText}>Manually Check {modalVolunteer?.checkedIn ? "Out" : "In"}</C4kText>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { marginTop: 20 },
                {
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <C4kText style={styles.buttonText}>Close</C4kText>
            </Pressable>
          </View>
        </View>
      </Modal>
      <BigList
        data={volunteers}
        renderItem={({ item }) => (
          <VolunteerItem volunteer={item} modalVolunteer={modalVolunteer} setModalVisible={setModalVisible} setModalVolunteer={setModalVolunteer} styles={styles} />
        )}
        itemHeight={50}
        renderFooter={() => { }}
        renderHeader={() => { }}
      // keyExtractor={item => item?.mailchimpMemberId}
      />
    </View>
  )
}

export default ChaperoneListCard
