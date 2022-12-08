// @refresh state
import { StatusBar } from "expo-status-bar"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import UserProvider from "./context/user.context"
import useCachedResources from "./hooks/useCachedResources"
import Navigation from "./navigation"
import { useFonts } from "expo-font"
import StylesProvider from "./context/styles.context"
import VolunteerProvider from "./context/volunteer.context"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import AssetsProvider from "./context/assets.context"

export default function App() {
  const isLoadingComplete = useCachedResources()
  let [fontsLoaded] = useFonts({
    "Fregata-Sans": require("./assets/fonts/Fregata-Sans.otf"),
    "ZillaSlab-Medium": require("./assets/fonts/ZillaSlab-Medium.ttf"),
    "ZillaSlab-Bold": require("./assets/fonts/ZillaSlab-Bold.ttf"),
    "ZillaSlab-SemiBold": require("./assets/fonts/ZillaSlab-SemiBold.ttf"),
    FjallaOne: require("./assets/fonts/FjallaOne-Regular.ttf"),
  })

  if (isLoadingComplete && fontsLoaded) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <UserProvider>
            <VolunteerProvider>
              <StylesProvider>
                <AssetsProvider>
                  <Navigation />
                  <StatusBar />
                </AssetsProvider>
              </StylesProvider>
            </VolunteerProvider>
          </UserProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    )
  } else {
    return null
  }
}
