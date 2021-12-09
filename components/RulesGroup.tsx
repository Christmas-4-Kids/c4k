import React from "react"
import { useState } from "react"
import { useStyles } from "../context/styles.context"
import { View, Text, Pressable } from "react-native"
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"

const RulesGroup = ({ groupName, rules }) => {
  const [clicked, setClicked] = useState(false)
  const { styles } = useStyles()
  console.log(`rules`, rules)
  return (
    <View style={styles.ruleCard}>
      <View onTouchStart={() => setClicked(!clicked)} style={clicked ? styles.ruleCardTitle : styles.ruleCardTitleCollapsed}>
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
      </View>
      {clicked ? (
        <View style={styles.rulesCardDescription}>
          <Text
            style={{
              minHeight: 61,
              paddingVertical: 15,
              paddingHorizontal: 25,
              fontFamily: "ZillaSlab-Medium",
              fontWeight: "600",
              fontSize: 12,
              color: "#1B2C39",
            }}
          >
            {rules.map((rule, index) => (
              <CheckListItem key={index} item={rule.description} />
            ))}
          </Text>
        </View>
      ) : null}
    </View>
  )
}

export default RulesGroup

const CheckListItem = ({ item }) => {
  const [isSelected, setSelection] = useState(false)

  return (
    <Pressable onPress={() => setSelection(!isSelected)}>
      <View style={{ flexDirection: "row", paddingLeft: 10, paddingTop: 15 }}>
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
    </Pressable>
  )
}
