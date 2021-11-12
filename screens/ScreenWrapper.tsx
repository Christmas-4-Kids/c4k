import * as React from "react"
import { ScrollView, Image } from "react-native"
import { View } from "../components/Themed"
import { useStyles } from "../context/styles.context"
import logo from "../assets/images/c4k-stacked.png"

export default function ScreenWrapper({ children }) {
  const { styles } = useStyles()
  return (
    <View style={styles.page}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.stickyHeader}></View>
        <View>
          <Image source={logo} style={{ width: 124, height: 59, alignSelf: "center" }} />
        </View>
        {children}
      </ScrollView>
    </View>
  )
}
