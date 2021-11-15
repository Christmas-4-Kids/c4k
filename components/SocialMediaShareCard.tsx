import React from "react"
import { View, Text, ImageBackground, Share } from "react-native"
import { useStyles } from "../context/styles.context"
import { FontAwesome5 } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"

const SocialMediaShareCard = () => {
  const { styles } = useStyles()
  const socialImageSize = 18
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "https://christmas4kids.org/volunteer/",
        url: "https://christmas4kids.org/volunteer/",
        title: "https://christmas4kids.org/volunteer/",
      })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <TouchableOpacity onPress={onShare}>
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
          <View style={styles.socialMediaShareCardLeft}>
            <Text style={styles.socialMediaShareCardLeftText}>help us reach more people</Text>
          </View>
          <View style={styles.socialMediaShareCardRight}>
            <View style={styles.socialMediaShareCardRightText}>
              <Text style={styles.socialMediaShareCardRightText}>Share C4K On Your Socials:</Text>
              <View style={styles.socialMediaShareCardIcons}>
                <FontAwesome5 name="facebook-square" size={socialImageSize} color="#FFF" />
                <FontAwesome5 name="instagram" size={socialImageSize} color="#FFF" />
                <FontAwesome5 name="twitter" size={socialImageSize} color="#FFF" />
                <FontAwesome5 name="linkedin-in" size={socialImageSize} color="#FFF" />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

export default SocialMediaShareCard
