import React from "react"
import ImageViewer from "react-native-image-zoom-viewer"
import ScreenWrapper from "./ScreenWrapper"
import { useAssets } from "../context/assets.context"

export const Shopping = () => {
  const { assets } = useAssets()
  const images = [
    {
      url: assets.get("map"),
    },
  ]
  return (
    <ScreenWrapper>
      <ImageViewer imageUrls={images} />
    </ScreenWrapper>
  )
}
