// @refresh state
import { StatusBar } from "expo-status-bar"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import UserProvider from "./context/user.context"
import useCachedResources from "./hooks/useCachedResources"
import useColorScheme from "./hooks/useColorScheme"
import Navigation from "./navigation"
import { useFonts } from "expo-font"

export default function App() {
  const isLoadingComplete = useCachedResources()
  let [fontsLoaded] = useFonts({
    "Fregata-Sans": require("./assets/fonts/Fregata-Sans.otf"),
    "ZillaSlab-Medium": require("./assets/fonts/ZillaSlab-Medium.ttf"),
  })
  const colorScheme = useColorScheme()

  if (isLoadingComplete && fontsLoaded) {
    return (
      <SafeAreaProvider style={{ backgroundColor: "#112430" }}>
        <UserProvider>
          <Navigation colorScheme={"light"} />
          <StatusBar />
        </UserProvider>
      </SafeAreaProvider>
    )
  } else {
    return null
  }
}
