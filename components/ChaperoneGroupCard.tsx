import React, { useState, useEffect } from "react"
import { View, Text, TextInput, Modal, NativeSyntheticEvent, TextInputChangeEventData, Pressable, Linking } from "react-native"
import { Card } from "./Card"
import { Entypo } from "@expo/vector-icons"
import { useStyles } from "../context/styles.context"
import { FontAwesome } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"

const ChaperoneGroupCard = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [chaperoneList, setChaperoneList] = useState([])

  const { styles } = useStyles()

  const getChaperoneList = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("chaperoneList")
      const cList = JSON.parse(jsonValue)

      if (cList === null) {
        console.log("chaperone list doesn't exist")
      } else {
        console.log(cList)
        setChaperoneList(cList)
      }
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    getChaperoneList()
  }, [])

  return (
    <View>
      <Card overrideStyles={styles.chaperoneGroupCard}>
        <View style={styles.chaperoneGroupCardHeader}>
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
            Chaperone Group
          </Text>
          <Entypo name="squared-plus" size={24} color="#EF364B" onPress={() => setModalOpen(true)} />
        </View>
        <View style={styles.chaperoneGroupCardBody}>
          {chaperoneList.length > 0 ? (
            chaperoneList.map((chaperone, index) => (
              <>
                <ChaperoneListItem key={index} name={chaperone.name} phone={chaperone.phone} chaperoneList={chaperoneList} setChaperoneList={setChaperoneList} />
                {index === chaperoneList.length - 1 ? null : <View key={`d${index}`} style={styles.chaperoneGroupItemDivider}></View>}
              </>
            ))
          ) : (
            <Text style={styles.chaperoneGroupCardBodyText}>Add your fellow chaperones here!</Text>
          )}
        </View>
        <ChaperoneModal visible={modalOpen} setVisible={setModalOpen} chaperoneList={chaperoneList} setChaperoneList={setChaperoneList} />
      </Card>
    </View>
  )
}

export default ChaperoneGroupCard

const ChaperoneListItem = ({ name, phone, chaperoneList, setChaperoneList }) => {
  const { styles } = useStyles()

  const pressCall = () => {
    const url = `tel://${phone}`
    Linking.openURL(url)
  }

  const removeContact = phone => {
    console.log(chaperoneList.filter(chaperone => chaperone.phone !== phone))
    setChaperoneList(chaperoneList.filter(chaperone => chaperone.phone !== phone))
    AsyncStorage.setItem("chaperoneList", JSON.stringify(chaperoneList.filter(chaperone => chaperone.phone !== phone)))
  }

  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <FontAwesome5 onPress={() => removeContact(phone)} name="trash-alt" size={11} color="red" />

      <Text style={styles.chaperoneGroupCardBodyText}>{name}</Text>

      <FontAwesome5 name="phone-alt" size={8} color="#FFF" style={{ backgroundColor: "#23A57F", borderRadius: 3, padding: 5 }} onPress={() => pressCall()} />
    </View>
  )
}

const ChaperoneModal = ({ visible, setVisible, chaperoneList, setChaperoneList }) => {
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")

  const { styles } = useStyles()

  return (
    <Modal visible={visible} animationType="slide">
      <View>
        <View>
          <FontAwesome name="window-close" size={24} color="#EF364B" onPress={() => setVisible(false)} />

          <Text>Add a fellow chaperone</Text>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.textInput}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setName(e.nativeEvent.text)}
              placeholder="name"
              value={name}
              returnKeyType="next"
              returnKeyLabel="next"
              autoFocus={true}
            />
          </View>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.textInput}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setNumber(e.nativeEvent.text)}
              placeholder="phone number"
              value={number}
              keyboardType="phone-pad"
              returnKeyType="next"
              returnKeyLabel="next"
              autoFocus={true}
            />
          </View>
          <Pressable
            style={styles.button}
            onPress={() => {
              setChaperoneList([...chaperoneList, { name: name, phone: number }])
              AsyncStorage.setItem("chaperoneList", JSON.stringify([...chaperoneList, { name: name, phone: number }]))
              setName("")
              setNumber("")
              setVisible(false)
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
