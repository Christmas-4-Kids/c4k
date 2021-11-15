import React from "react"
import { View, Text, ImageBackground } from "react-native"
import { useStyles } from "../context/styles.context"
import { FontAwesome5 } from "@expo/vector-icons"

const SocialMediaShareCard = () => {
  const { styles } = useStyles()

  return (
    <View style={styles.socialMediaShareCard}>
      <ImageBackground
        source={require("../assets/images/gradient.png")}
        style={{
          overflow: "hidden",
          borderRadius: 10,
          flexDirection: "row",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View style={styles.socialMediaShareCardLeftText}>
          <Text style={styles.socialMediaShareCardLeftText}>
            HELP US REACH MORE PEOPLE
          </Text>
        </View>
        <View style={styles.socialMediaShareCardRightText}>
          <View style={styles.socialMediaShareCardRightView}>
            <Text
              style={{
                fontFamily: "ZillaSlab-Medium",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: 8,
                color: "#FFF",
              }}
            >
              Share C4K On Your Socials:
            </Text>
            <View style={styles.socialMediaShareCardIcons}>
              <FontAwesome5 name="facebook-square" size={14} color="#FFF" />
              <FontAwesome5 name="instagram" size={14} color="#FFF" />
              <FontAwesome5 name="twitter" size={14} color="#FFF" />
              <FontAwesome5 name="linkedin-in" size={14} color="#FFF" />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default SocialMediaShareCard
