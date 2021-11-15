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
    <View style={styles.RuleCard}>
      <Image
        style={styles.RuleCardOrnament}
        source={require("../assets/images/ornament.png")}
      />

      <Text style={styles.RuleCardOrder}>{order}</Text>

      <View style={styles.RuleCardTitle}>
        <Text style={{ color: "#FFF", fontFamily: "FjallaOne", fontSize: 13 }}>
          {title}
        </Text>
      </View>

      <View style={styles.RulesCardDescription}>
        <Text
          style={{
            minHeight: 61,
            paddingVertical: 15,
            paddingHorizontal: 25,
            fontFamily: "ZillaSlab-Medium",
            fontWeight: "600",
            fontSize: 7,
          }}
        >
          {description}
        </Text>
      </View>
    </View>
  )
}

export default RuleCard
