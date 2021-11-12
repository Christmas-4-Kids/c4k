import React, { useState, useEffect } from "react"
import { Image, View, Text } from "react-native"
import logo from "../assets/images/logo-transparent.png"
import { fetchRules } from "../services/firestore.service"
import { Loading } from "./Loading"
import { useStyles } from "../context/styles.context"
import ScreenWrapper from "./ScreenWrapper"
import { Card } from "../components/Card"
import RuleCard from "../components/RuleCard"

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
      <Card overrideStyles={styles.rulesHeaderCard}>
        <Text style={styles.rulesTabHeader}>HOW TO AVOID SANTA'S NAUGHTY LIST</Text>
        <Text style={styles.rulesTabSubtext}>Everything you need to know about being a chaperone on the big shopping day.</Text>
      </Card>

      {rules.length > 0 ? (
        rules
          .sort((first, last) => first.order - last.order)
          .map(rule => (
            <React.Fragment key={rule.order}>
              <RuleCard number={rule.order} title={rule.title} description={rule.description} />
            </React.Fragment>
          ))
      ) : (
        <Loading />
      )}
    </ScreenWrapper>
  )
}

// {rule.order !== 1 && !!rule.title && <Image source={logo} style={{ width: 50, height: 50, alignSelf: "center" }} />}
// {!!rule.title && (
//   <View style={{ marginBottom: rule.description ? 0 : 0 }}>
//     <Text
//       style={{
//         marginTop: 5,
//         fontSize: rule.order === 1 ? 50 : 24,
//         lineHeight: rule.order === 1 ? 35 : 25,
//         color: "#fff",
//         textAlign: "center",
//         fontFamily: rule.order === 1 ? "Fregata-Sans" : "ZillaSlab-Bold",
//       }}
//     >
//       {rule.title}
//     </Text>
//   </View>
// )}
// <Text style={styles.sectionDescription}>{rule.description}</Text>
