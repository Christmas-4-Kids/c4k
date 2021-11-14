import React from "react"
import { useStyles } from "../context/styles.context"
import { Text, TextInput, View, Image, ScrollView } from "react-native"

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
        source={require("../assets/images/o.svg")}
      />

      <Text style={styles.RulesCardNumber}>{order}</Text>

      <View style={styles.RuleCardTitle}>
        <Text style={{ color: "#FFF", fontFamily: "FjallaOne", fontSize: 13 }}>
          {title}
        </Text>
      </View>

      <View style={styles.RulesCardDescription}>
        <Text
          style={{
            padding: 5,
            height: 61,
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
