import React from "react";
import { StatusBar } from "react-native";
import { UserProvider } from "./context/StateContext";
import Main from "./screens/Main";
import DeviceInfo from "react-native-device-info";

export function App() {
  return (
    <UserProvider>
      <StatusBar barStyle="light-content" />
      <Main />
    </UserProvider>
  );
}
