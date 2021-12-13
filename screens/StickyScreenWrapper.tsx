import * as React from "react"
import { ScrollView, Image } from "react-native"
import { View, Text } from "../components/Themed"
import { useStyles } from "../context/styles.context"
import logo from "../assets/images/c4k-stacked.png"
import { Card } from "../components/Card"
import { C4kText } from "../components/C4kText"

export default function StickyScreenWrapper({ children }) {
  const { styles } = useStyles()
  return (
    <View style={styles.page}>
      <View style={styles.stickyHeader}>
        <Image
          source={logo}
          style={{
            width: 170,
            height: 81,
            marginTop: -15,
            alignSelf: "center",
          }}
        />
      </View>
      <ScrollView stickyHeaderIndices={[0]} contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1, marginTop: 90 }}>
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0)",
          }}
        >
          <Card overrideStyles={styles.rulesHeaderCard}>
            <C4kText style={styles.rulesTabHeader}>how to avoid santa's naughty list</C4kText>
            <C4kText style={styles.rulesTabSubtext}>Everything you need to know about being a chaperone on the big shopping day.</C4kText>
          </Card>
        </View>
        {children}
      </ScrollView>
    </View>
  )
}
