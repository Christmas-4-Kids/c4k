import React from "react"
import { View, ImageBackground } from "react-native"
import { useStyles } from "../context/styles.context"
import { FontAwesome5 } from "@expo/vector-icons"
import gradientBg from "../assets/images/gradient.png"

const SocialMediaShareCard = () => {
  const { styles } = useStyles()

  return (
    <View style={styles.socialMediaShareCard}>
      <ImageBackground
        source={{
          uri: gradientBg,
        }}
        style={{
          alignSelf: "center",
          padding: 0,
          width: "100%",
          height: "70px",
          overflow: "hidden",
          borderRadius: 10,
          flexDirection: "row",
        }}
      >
        <View style={styles.socialMediaShareCardLeftText}>
          HELP US REACH MORE PEOPLE
        </View>
        <View style={styles.socialMediaShareCardRightText}>
          Share C4K On Your Socials:
          <View style={styles.socialMediaShareCardIcons}>
            <FontAwesome5 name="facebook-square" size={14} color="#FFF" />
            <FontAwesome5 name="instagram" size={14} color="#FFF" />
            <FontAwesome5 name="twitter" size={14} color="#FFF" />
            <FontAwesome5 name="linkedin-in" size={14} color="#FFF" />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default SocialMediaShareCard
