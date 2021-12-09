import React from "react"
import ImageViewer from "react-native-image-zoom-viewer"
import ScreenWrapper from "./ScreenWrapper"

export const Shopping = () => {
  const images = [
    {
      url: "",
      props: {
        source: require("../assets/images/map.png"),
      },
    },
  ]
  return (
    <ScreenWrapper>
      <ImageViewer imageUrls={images} />
    </ScreenWrapper>
  )
}
