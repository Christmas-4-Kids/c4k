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
      position: "fixed",
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
      boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.16)",
    },
    button: {
      backgroundColor: colors.primary,
      padding: 20,
      alignItems: "center",
      borderRadius: 10,
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
      height: 50,
      borderColor: "gray",
      borderWidth: 1,
      fontSize: 18,
      borderRadius: 10,
      marginBottom: 20,
      padding: 5,
      color: "#fff",
    },
    errorMessage: {
      color: "red",
      fontSize: 16,
      textAlign: "center",
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
      color: "#fff",
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
      fontSize: 18,
      color: "#FFF",
      fontFamily: "ZillaSlab-Medium",
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
      padding: 20,
      alignItems: "center",
      borderRadius: 10,
      opacity: 0.8,
    },
    textInputText: {
      color: "#cbcbcb",
      fontSize: 12,
      paddingBottom: 5,
      fontFamily: "ZillaSlab-Medium",
    },
    upcomingEventsCardTitle: {
      fontFamily: "FjallaOne",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: 15.5,
      marginBottom: "8px",
    },
    UpcomingEventsCardDivider: {
      width: "266px",
      height: "1px",
      backgroundColor: "rgba(196, 196, 196, 0.5)",
      marginTop: "7px",
      marginBottom: "7px",
    },
    upcomingEventContainer: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    upcomingEventBox: {
      backgroundColor: "#318AC7",
      width: "35px",
      height: "35px",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    upcomingEventMonth: {
      fontFamily: "FjallaOne",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 10,
      margin: -3,
      color: "#FFFFFF",
    },
    upcomingEventDay: {
      margin: -9,
      fontFamily: "Fregata-Sans",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: 25,
      textAlign: "center",
      color: "#FFFFFF",
    },
    upcomingEventDetailsContainer: {
      flexDirection: "column",
    },
    upcomingEventTitle: {
      width: "110px",
      fontFamily: "FjallaOne",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: 10,
      lineHeight: 13,
      color: "#318AC7",
    },
    upcomingEventDescription: {
      width: "110px",
      fontFamily: "ZillaSlab-Medium",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: 8,
      color: "#15232E",
    },
    upcomingEventButton: {
      alignItems: "center",
      justifyContent: "center",
      width: "60px",
      height: "20px",
      border: "1px solid #EF364B",
      boxSizing: "border-box",
    },
    upcomingEventButtonText: {
      fontFamily: "ZillaSlab-Medium",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: 8,
      alignItems: "center",
      color: "#EF364B",
    },
  }
  const styles = StyleSheet.create(initialState)
  return (
    <StylesContext.Provider value={{ styles }}>
      {children}
    </StylesContext.Provider>
  )
}

export const useStyles = () => {
  const context = React.useContext<any>(StylesContext)
  if (context === undefined) {
    throw new Error("useStyles must be used inside a StylesProvider")
  }
  return context
}
