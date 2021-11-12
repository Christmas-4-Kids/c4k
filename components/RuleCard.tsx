import React from "react"
import { useStyles } from "../context/styles.context"
import { View, Image } from "react-native"

interface Rule {
  order: number
  title: string
  description: string
}

interface RuleCardProps {
  rule: Rule
}

const RuleCard = (RuleCardProps) => {
  const { styles } = useStyles()

  return (
    <View style={styles.RuleCard}>
      <Image
        style={styles.RuleCardOrnament}
        source={require("../assets/images/o.svg")}
      />
      <View style={styles.RulesCardNumber}>{RuleCardProps.number}</View>
      <View style={styles.RuleCardTitle}>{RuleCardProps.title}</View>
      <View style={styles.RuleCardDescription}>
        {RuleCardProps.description}
      </View>
    </View>
  )
}

export default RuleCard
