import React from "react"
import { useState } from "react"
import { useStyles } from "../context/styles.context"
import { View, Text } from "react-native"
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"

const RulesGroup = ({ groupName, rules }) => {
  const [clicked, setClicked] = useState(false)
  const { styles } = useStyles()
  return (
    <View style={styles.ruleCard}>
      <TouchableOpacity onPress={() => setClicked(!clicked)} style={clicked ? styles.ruleCardTitle : styles.ruleCardTitleCollapsed}>
        <View
          style={{
            alignItems: "center",
            paddingLeft: 10,
            flexDirection: "row",
          }}
        >
          <Text>{clicked ? <AntDesign name="minuscircleo" size={24} color="#fff" /> : <AntDesign name="pluscircleo" size={24} color="#FFF" />}</Text>
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
            <CheckListItem key={index} item={rule.description} />
          ))}
        </View>
      ) : null}
    </View>
  )
}

export default RulesGroup

const CheckListItem = ({ item }) => {
  const [isSelected, setSelection] = useState(false)

  return (
    <TouchableOpacity onPress={() => setSelection(!isSelected)}>
      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        <Text>
          {isSelected ? <MaterialCommunityIcons name="checkbox-marked" size={24} color="green" /> : <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="gray" />}
        </Text>
        <Text
          style={{
            paddingLeft: 5,
            color: isSelected ? "#CFCFCF" : "#1B2C39",
            fontFamily: "ZillaSlab-Medium",
            fontSize: 14,
          }}
        >
          {item}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
