import React from "react";
import { StatusBar, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserProvider from "./context/user.context";
import Main from "./screens/Main";

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <StatusBar barStyle="light-content" />
        <Main />
      </UserProvider>
    </SafeAreaProvider>
  );
}
