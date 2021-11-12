import React, { useState, useEffect } from "react"
import { Image, ScrollView, View, Text, StyleSheet } from "react-native"
import logo from "../assets/images/logo-transparent.png"
import busLogo from "../assets/images/c4k-logo.png"
import { fetchRules } from "../services/firestore.service"
import { Loading } from "./Loading"
import { useStyles } from "../context/styles.context"
import ScreenWrapper from "./ScreenWrapper"

export const Rules = () => {
  const { styles } = useStyles()

  const [rules, setRules] = useState([])

  useEffect(() => {
    fetchRules().then(data => {
      setRules(data.data)
    })
  }, [])

  return (
    <ScreenWrapper>
      <Image
        source={busLogo}
        style={{
          width: 180,
          height: 180,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />
      {rules.length > 0 ? (
        rules
          .sort((first, last) => first.order - last.order)
          .map(rule => (
            <React.Fragment key={rule.order}>
              {rule.order !== 1 && !!rule.title ? <Image source={logo} style={{ width: 50, height: 50, alignSelf: "center" }} /> : null}
              {!!rule.title ? (
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
              ) : null}
              <Text style={styles.sectionDescription}>{rule.description}</Text>
            </React.Fragment>
          ))
      ) : (
        <Loading />
      )}
    </ScreenWrapper>
  )
}
