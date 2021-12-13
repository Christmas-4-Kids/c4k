import React from "react"
import { useStyles } from "../context/styles.context"
import { Text, View, Image } from "react-native"
import { C4kText } from "./C4kText"

interface Rule {
  order: number
  title: string
  description: string
}

interface RuleCardProps {
  rule: Rule
}

const RuleCard = ({ order, title, description }) => {
  const { styles } = useStyles()

  return (
    <View style={styles.ruleCard}>
      <Image style={styles.ruleCardOrnament} source={require("../assets/images/ornament.png")} />

      <C4kText style={styles.ruleCardOrder}>{order}</C4kText>

      <View style={styles.ruleCardTitle}>
        <C4kText style={{ color: "#FFF", fontFamily: "FjallaOne", fontSize: 14, paddingHorizontal: 20 }}>{title === "" ? "Remember..." : title}</C4kText>
      </View>

      <View style={styles.rulesCardDescription}>
        <C4kText
          style={{
            minHeight: 61,
            paddingVertical: 15,
            paddingHorizontal: 25,
            fontFamily: "ZillaSlab-Medium",
            fontWeight: "600",
            fontSize: 12,
          }}
        >
          {description}
        </C4kText>
      </View>
    </View>
  )
}

export default RuleCard
