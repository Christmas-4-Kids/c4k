import React, { useEffect } from "react"
import { useState } from "react"
import { useStyles } from "../context/styles.context"
import { View, Text } from "react-native"
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { ListItem } from "react-native-elements/dist/list/ListItem"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { C4kText } from "./C4kText"

const RulesGroup = ({ groupName, rules }) => {
  const [clicked, setClicked] = useState(false)
  const { styles } = useStyles()
  return (
    <View style={styles.ruleCard}>
      <TouchableOpacity
        onPress={() => setClicked(!clicked)}
        style={clicked ? styles.ruleCardTitle : styles.ruleCardTitleCollapsed}
      >
        <View
          style={{
            alignItems: "center",
            paddingLeft: 10,
            flexDirection: "row",
          }}
        >
          <Text>
            {clicked ? (
              <AntDesign name="minuscircleo" size={24} color="#fff" />
            ) : (
              <AntDesign name="pluscircleo" size={24} color="#FFF" />
            )}
          </Text>
          <Text
            style={{
              color: "#FFF",
              fontFamily: "FjallaOne",
              fontSize: 14,
              paddingHorizontal: 10,
            }}
          >
            {groupName}
          </Text>
        </View>
      </TouchableOpacity>
      {clicked ? (
        <View
          style={{
            minHeight: 61,
            paddingVertical: 15,
            paddingLeft: 15,
            paddingRight: 30,
          }}
        >
          {rules.map((rule, index) => (
            <CheckListItem
              key={index}
              item={rule.description}
              order={rule.order}
            />
          ))}
        </View>
      ) : null}
    </View>
  )
}

export default RulesGroup

const CheckListItem = ({ item, order }) => {
  const [isSelected, setSelection] = useState(Boolean)

  const changeSelection = async () => {
    try {
      const state = !isSelected
      await AsyncStorage.setItem(order.toString(), state.toString())
    } catch (e) {}
    setSelection(!isSelected)
  }
  useEffect(() => {
    async function fetchSelected() {
      const value = await AsyncStorage.getItem(order.toString())
      switch (value) {
        case "false":
          setSelection(false)
          break
        case "true":
          setSelection(true)
          break
        default:
          setSelection(false)
      }
    }
    fetchSelected()
  }, [])
  return (
    <TouchableOpacity onPress={() => changeSelection()}>
      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        <C4kText>
          {isSelected ? (
            <MaterialCommunityIcons
              name="checkbox-marked"
              size={24}
              color="green"
            />
          ) : (
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              size={24}
              color="gray"
            />
          )}
        </C4kText>
        <C4kText
          style={{
            paddingLeft: 5,
            color: isSelected ? "#CFCFCF" : "#1B2C39",
            fontFamily: "ZillaSlab-Medium",
            fontSize: 14,
          }}S
        >
          {item}
        </C4kText>
      </View>
    </TouchableOpacity>
  )
}
