import React, { useEffect, useState } from "react"
import { useStyles } from "../context/styles.context"
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native"
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons"
import { Volunteer } from "../context/volunteer.context"
import BigList from "react-native-big-list"
import { updateVolunteerCheckedIn } from "../services/firestore.service"

const getVolunteerType = (volunteerType: string) => {
  switch (volunteerType) {
    case "2021_ADMIN":
      return "Organizer"
    case "2021_ALL_DAY_CHAPERONE":
      return "All Day Chaperone"
    case "2021_EVENING_CHAPERONE":
      return "Evening Chaperone"
    case "2021_LEBANON_CHAPERONE":
      return "Lebanon Chaperone"
    case "2021_DRIVER":
      return "Driver"
    default:
      return "Unknown"
  }
}

const VolunteerItem = (props: {
  volunteer: Volunteer
  modalVolunteer: Volunteer
  setModalVisible: (modalVisible: boolean) => void
  setModalVolunteer: (volunteer: Volunteer) => void
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
          <Text style={isCheckedIn ? styles.volunteerCheckedIn : styles.volunteerNotCheckedIn}>
            {isCheckedIn ? <AntDesign name="checksquare" size={24} color="green" /> : <AntDesign name="checksquare" size={24} color="gray" />}
          </Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "flex-start", width: "68%" }}>
          <Text style={styles.chaperoneListItemName}>{`${volunteer?.firstName} ${volunteer?.lastName}`}</Text>
          <Text style={styles.chaperoneListItemVolunteerType}>{getVolunteerType(volunteer?.volunteerType)}</Text>
        </View>
        <View style={{ flexDirection: "row", alignContent: "flex-end" }}>
          {volunteer?.spanish === "Yes" ? <Text style={styles.searchFilterPillTextOn}>Esp</Text> : null}
          {volunteer?.medical !== "None" ? <Text style={styles.searchFilterPillTextOn}>Med</Text> : null}
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
  return (
    <View style={styles.chaperoneListCard}>
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
            <View style={{ flexDirection: "column-reverse" }}>
              <Text style={[styles.userCardName, { marginTop: -15 }]}>{modalVolunteer?.fullName}</Text>
              <View style={{ flexDirection: "row", alignContent: "flex-start" }}>
                <Text style={modalVolunteer?.checkedIn ? styles.volunteerCheckedIn : styles.volunteerNotCheckedIn}>
                  {modalVolunteer?.checkedIn ? <AntDesign name="checksquare" size={26} color="green" /> : <AntDesign name="checksquare" size={26} color="gray" />}
                </Text>
                {modalVolunteer?.spanish === "Yes" ? <Text style={styles.searchFilterPillTextOn}>Esp</Text> : null}
                {modalVolunteer?.medical !== "None" ? <Text style={styles.searchFilterPillTextOn}>Med</Text> : null}
              </View>
            </View>
            <Text style={[styles.chaperoneListItemVolunteerType, { marginTop: -5 }]}>{getVolunteerType(modalVolunteer?.volunteerType)}</Text>
            <View style={styles.userCardDivider}></View>
            <View style={styles.volunteerCardInfoRow}>
              <Text style={styles.volunteerCardInfoText}>
                <Entypo style={{ paddingRight: 10 }} name="location-pin" size={24} color="#1B2C39" />
              </Text>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.volunteerCardInfoText}>{`${modalVolunteer?.address?.addr1} ${modalVolunteer?.address?.addr2}`}</Text>
                <Text style={styles.volunteerCardInfoText}>{`${modalVolunteer?.address?.city}, ${modalVolunteer?.address?.state}`}</Text>
              </View>
            </View>
            <View style={styles.volunteerCardInfoRow}>
              <Text style={styles.volunteerCardInfoText}>
                <Entypo style={{ paddingRight: 10 }} name="mail" size={24} color="#1B2C39" />
              </Text>
              <Text style={styles.volunteerCardInfoText}> {modalVolunteer?.email}</Text>
            </View>
            <View style={styles.volunteerCardInfoRow}>
              <Text style={styles.volunteerCardInfoText}>
                <FontAwesome5 style={{ paddingRight: 10 }} name="bus" size={24} color="black" />
              </Text>
              <Text style={styles.volunteerCardInfoText}> {modalVolunteer?.driver === "" || !modalVolunteer?.driver ? "N/A" : modalVolunteer?.driver}</Text>
            </View>
            <View style={styles.volunteerCardInfoRow}>
              <Text style={styles.volunteerCardInfoText}>
                <FontAwesome5 style={{ paddingRight: 10 }} name="comment" size={24} color="black" />
              </Text>
              <Text style={styles.volunteerCardInfoText}> {modalVolunteer?.comments === "" || !modalVolunteer?.comments ? "N/A" : modalVolunteer?.comments}</Text>
            </View>
            <Pressable style={[styles.button, { backgroundColor: modalVolunteer?.checkedIn ? "#C4C4C4" : "#2BA57F" }]} onPress={onCheckInPress}>
              <Text style={styles.buttonText}>Manually Check {modalVolunteer?.checkedIn ? "Out" : "In"}</Text>
            </Pressable>
            <Pressable style={[styles.button, { marginTop: 20 }]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonText}>Close</Text>
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
        keyExtractor={item => item?.mailchimpMemberId}
      />
    </View>
  )
}

export default ChaperoneListCard
