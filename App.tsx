import React from "react"
import { StatusBar, useColorScheme } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import UserProvider from "./context/user.context"
import useCachedResources from "./hooks/useCachedResources"
import { Landing } from "./screens/Landing"

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <UserProvider>
          <Landing />
        </UserProvider>
      </SafeAreaProvider>
    )
  }
}
