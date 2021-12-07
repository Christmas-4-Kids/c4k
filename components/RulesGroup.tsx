import React from "react"
import { useState } from "react"
import { useStyles } from "../context/styles.context"
import { View, Text, CheckBox } from "react-native"
import { AntDesign } from "@expo/vector-icons"

const RulesGroup = ({ groupName, rules }) => {
  const [clicked, setClicked] = useState(false)
  const { styles } = useStyles()

  return (
    <View style={styles.ruleCard}>
      <View
        onTouchStart={() => setClicked(!clicked)}
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
    <View style={{ flexDirection: "row" }}>
      <Text>
        <CheckBox value={isSelected} onValueChange={setSelection} />
      </Text>
      <Text
        style={{
          flex: 1,
          paddingLeft: 5,
          color: isSelected ? "#CFCFCF" : "black",
        }}
      >
        {item}
      </Text>
    </View>
  )
}
