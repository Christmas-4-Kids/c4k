import * as React from "react"
import { ScrollView, Image } from "react-native"
import { View } from "../components/Themed"
import { useStyles } from "../context/styles.context"
import logo from "../assets/images/c4k-stacked.png"

export default function ScreenWrapper({ children }) {
  const { styles } = useStyles()
  return (
    <View style={styles.page}>
      <View style={styles.stickyHeader}>
        <Image source={logo} style={{ width: 170, height: 81, marginTop: -15, alignSelf: "center" }} />
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1, marginTop: 90 }}>
        {children}
      </ScrollView>
    </View>
  )
}
