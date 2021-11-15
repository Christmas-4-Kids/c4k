import React, { useState, useEffect } from "react"
import { Text } from "react-native"
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
              <RuleCard order={rule.order} title={rule.title} description={rule.description} />
            </React.Fragment>
          ))
      ) : (
        <Loading />
      )}
      {/* Added this blank View so that very last rule card displays. it wasn't scrolling down all the way for some reason */}
      <View style={{height: 110}}></View> 
    </ScreenWrapper>
  )
}
