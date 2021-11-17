import React from "react"
import { useStyles } from "../context/styles.context"
import { Text, View, Image } from "react-native"

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
      <View style={styles.ruleCardOrnament}>
        <Text style={styles.ruleCardOrder}>{order}</Text>
        <Image style={{ width: 34, height: 32 }} source={require("../assets/images/ornament.png")} />
      </View>
      <View style={styles.ruleCardTitle}>
        <Text style={{ color: "#FFF", fontFamily: "FjallaOne", fontSize: 14, paddingHorizontal: 20 }}>{title === "" ? "Remember..." : title}</Text>
      </View>

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
          {description}
        </Text>
      </View>
    </View>
  )
}

export default RuleCard
