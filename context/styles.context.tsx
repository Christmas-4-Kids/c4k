import React from "react"
import { StyleSheet } from "react-native"
import { useTheme } from "@react-navigation/native"

const StylesContext = React.createContext({})

export default function StylesProvider({ children }: { children: any }) {
  const { colors } = useTheme()
  const initialState: any = {
    page: {
      flex: 1,
      paddingTop: 30,
      paddingBottom: 20,
      backgroundColor: colors.background,
      fontFamily: "ZillaSlab-Medium",
    },
    stickyHeader: {
      position: "absolute",
      top: 0,
      backgroundColor: "#15232E",
      width: "100%",
      height: 150,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
    },
    scrollView: {
      backgroundColor: colors.background,
    },
    card: {
      backgroundColor: "#FFF",
      alignSelf: "center",
      padding: 20,
      width: "85%",
      margin: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 16,
      shadowRadius: 9,
    },
    button: {
      backgroundColor: "#EF364B",
      padding: 12,
      alignItems: "center",
    },
    closeButton: {
      backgroundColor: colors.primary, //'#EF334C',
      padding: 20,
      alignItems: "center",
      borderRadius: 10,
    },
    nativeCloseContainer: {
      alignItems: "flex-end",
      right: 1,
    },
    nativeClose: {
      marginRight: 30,
      marginTop: 10,
    },
    engine: {
      position: "absolute",
      right: 0,
    },
    body: {
      backgroundColor: colors.background,
    },
    textInput: {
      color: "#2C363D",
      fontFamily: "FjallaOne",
      fontSize: 14,
      width: "80%",
    },
    errorMessage: {
      color: "red",
      fontSize: 14,
      textAlign: "center",
      fontFamily: "ZillaSlab-Medium",
      paddingBottom: 15,
    },
    sectionContainer: {
      flex: 1,
      backgroundColor: colors.background,
      marginTop: 20,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "600",
      color: "#fff",
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: "400",
      color: "#fff",
    },
    sectionText: {
      fontFamily: "FjallaOne",
      color: "#2C363D",
    },
    highlight: {
      fontWeight: "700",
    },
    footer: {
      color: colors.background,
      fontSize: 12,
      fontWeight: "600",
      padding: 4,
      paddingRight: 12,
      textAlign: "right",
    },
    goodScan: {
      textAlign: "center",
      color: "#32CD32",
      fontSize: 60,
      fontWeight: "800",
      padding: 20,
    },
    badScan: {
      textAlign: "center",
      color: "#EF334C",
      fontSize: 20,
      fontWeight: "700",
      padding: 20,
    },
    member: {
      marginTop: 15,
      paddingHorizontal: 10,
    },
    memberRow: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    memberColumn: {
      flex: 1,
      flexDirection: "column",
    },
    memberPhone: {
      alignItems: "flex-end",
      right: 1,
    },
    memberName: {
      color: "#fff",
      fontSize: 16,
    },
    memberVerified: {
      fontSize: 16,
    },
    memberNotVerified: {
      fontSize: 16,
    },
    memberAddress: {
      color: "#898989",
    },
    buttonText: {
      fontSize: 22,
      color: "#FFF",
      fontFamily: "FjallaOne",
    },
    sectionTextTop: {
      fontSize: 60,
      fontFamily: "Fregata-Sans",
      color: "#fff",
      textAlign: "center",
      marginTop: 10,
    },
    socialsWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      padding: 20,
      fontSize: 30,
      color: "#FFF",
    },
    countdownItemWrapper: {
      display: "flex",
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    countdownTime: {
      color: "#FFF",
      fontSize: 50,
      display: "flex",
      fontFamily: "Fregata-Sans",
      width: 34,
      height: 60,
    },
    countdownItem: {
      backgroundColor: "#EF364B",
      display: "flex",
      margin: 1,
      paddingHorizontal: 10,
      paddingVertical: 1,
      position: "relative",
    },
    countdownLabel: {
      color: "#FFF",
      fontSize: 10,
      lineHeight: 13,
      fontWeight: "600",
      textTransform: "uppercase",
      fontFamily: "FjallaOne",
      width: 34,
      height: 13,
      paddingBottom: 20,
    },
    container: {
      flex: 1,
      justifyContent: "center",
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
      position: "absolute",
      left: 0,
      right: 0,
      top: 350,
      zIndex: 999,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    link: {
      marginTop: 15,
      paddingVertical: 15,
    },
    linkText: {
      fontSize: 14,
      color: "#2e78b7",
    },

    buttonDisabled: {
      backgroundColor: "#EF334C",
      padding: 12,
      alignItems: "center",
      opacity: 0.8,
    },
    textInputText: {
      color: "#cbcbcb",
      fontSize: 12,
      paddingBottom: 5,
      fontFamily: "ZillaSlab-Medium",
    },
    formBackground: {
      height: "254px",
      position: "absolute",
      bottom: "0px",
    },

    // SIGN IN PAGE
    register: {
      fontFamily: "FjallaOne",
      color: "#2C363D",
      textAlign: "center",
      paddingBottom: 15,
    },
    checkInWrapper: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      width: "100%",
      paddingHorizontal: 56,
      paddingVertical: 31,
      textAlign: "center",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      position: "absolute",
      bottom: 0,
      maxHeight: 430,
      minHeight: 230,
    },
    textInputView: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: "black",
      borderWidth: 1,
      marginBottom: 5,
      color: "#2C363D",
      fontSize: 14,
      minHeight: 50,
    },
    textInputIcon: {
      color: "#E8364D",
      fontSize: 20,
      margin: 10,
    },
    checkInTitle: {
      fontFamily: "FjallaOne",
      fontWeight: "400",
      fontSize: 27,
      textAlign: "center",
    },
    checkInSubtitle: {
      fontFamily: "ZillaSlab-Medium",
      fontSize: 12,
      color: "#E8364D",
      paddingBottom: 10,
      textAlign: "center",
    },
  }
  const styles = StyleSheet.create(initialState)
  return <StylesContext.Provider value={{ styles }}>{children}</StylesContext.Provider>
}

export const useStyles = () => {
  const context = React.useContext<any>(StylesContext)
  if (context === undefined) {
    throw new Error("useStyles must be used inside a StylesProvider")
  }
  return context
}
