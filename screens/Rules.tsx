import React, { useState, useEffect } from "react"
import { Image, ScrollView, View, Text, StyleSheet } from "react-native"
import logo from "../assets/images/logo-transparent.png"
import busLogo from "../assets/images/c4k-logo.png"
import { fetchRules } from "../services/firestore.service"
import { Loading } from "./Loading"

export const Rules = () => {
  const styles = StyleSheet.create({
    page: {
      flex: 1,
      paddingTop: 30,
      paddingBottom: 20,
      backgroundColor: "#112430",
    },
    sectionContainer: {
      flex: 1,
      backgroundColor: "#112430",
      marginTop: 20,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      color: "#fff",
      fontFamily: "ZillaSlab-Bold",
    },
    sectionDescription: {
      marginVertical: 5,
      fontSize: 18,
      color: "#fff",
      textAlign: "center",
      fontFamily: "ZillaSlab-Medium",
    },
  })

  const [rules, setRules] = useState([])

  useEffect(() => {
    fetchRules().then(data => {
      setRules(data.data)
    })
  }, [])

  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
          <Image source={busLogo} style={{ width: 180, height: 180, alignSelf: "center", marginBottom: 20 }} />
          {rules.length > 0 ? (
            rules
              .sort((first, last) => first.order - last.order)
              .map(rule => (
                <React.Fragment key={rule.order}>
                  {rule.order !== 1 && !!rule.title && <Image source={logo} style={{ width: 50, height: 50, alignSelf: "center" }} />}
                  {!!rule.title && (
                    <View style={{ marginBottom: rule.description ? 0 : 0 }}>
                      <Text
                        style={{
                          marginTop: 5,
                          fontSize: rule.order === 1 ? 50 : 24,
                          lineHeight: rule.order === 1 ? 35 : 25,
                          color: "#fff",
                          textAlign: "center",
                          fontFamily: rule.order === 1 ? "Fregata-Sans" : "ZillaSlab-Bold",
                        }}
                      >
                        {rule.title}
                      </Text>
                    </View>
                  )}
                  <Text style={styles.sectionDescription}>{rule.description}</Text>
                </React.Fragment>
              ))
          ) : (
            <Loading />
          )}
        </ScrollView>
      </View>
    </View>
  )
}
