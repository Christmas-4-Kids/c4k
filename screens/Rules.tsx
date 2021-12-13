import React, { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { fetchRules } from "../services/firestore.service"
import { Loading } from "./Loading"
import { useUser } from "../context/user.context"
import StickyScreenWrapper from "./StickyScreenWrapper"
import RulesGroup from "../components/RulesGroup"
import ScreenWrapper from "./ScreenWrapper"
import { Card } from "../components/Card"
import { useStyles } from "../context/styles.context"
import { C4kText } from "../components/C4kText"

export const Rules = () => {
  const [rules, setRules] = useState([])
  const [groupedRules, setGroupedRules] = useState([])
  const { styles } = useStyles()
  const { user } = useUser()
  const volunteerType = user.volunteerType.slice(5) //removes 2021_ prefix

  useEffect(() => {
    fetchRules().then(data => {
      setRules((data as any).data)
    })
  }, [])

  useEffect(() => {
    const uniqueGroups = [...new Set(rules.filter(rule => rule.volunteerTypes?.includes(volunteerType)).map(rule => rule.group))]
    const gRules = []
    for (const group of uniqueGroups) {
      const orderedGroupRulesByGroup = rules.filter(rule => rule.group === group).sort((first, last) => first.order - last.order)
      gRules.push({ group, rules: orderedGroupRulesByGroup })
    }
    // sorts the groups themselves
    gRules.sort((first, last) => first.rules[0].order - last.rules[0].order)
    setGroupedRules(gRules)
  }, [rules])

  return (
    <ScreenWrapper>
      <Card overrideStyles={styles.rulesHeaderCard}>
        <C4kText style={styles.rulesTabHeader}>how to avoid santa's naughty list</C4kText>
        <C4kText style={styles.rulesTabSubtext}>Everything you need to know about being a chaperone on the big shopping day.</C4kText>
      </Card>
      <View>
        {rules.length > 0 ? groupedRules.map((item, index) => <RulesGroup key={index} rules={item.rules} groupName={item.group} />) : <Loading />}
        {rules.length > 0 ? (
          <RulesGroup
            rules={[
              {
                description:
                  "The children and the Christmas4Kids Staff want to thank you again for spending your day with us - we hope you enjoy it as much as we do! If you need anything or have any questions do not hesitate to call.",
              },
            ]}
            groupName={"Thank You!"}
          />
        ) : null}
        {/* Added this blank View so that very last rule card displays. it wasn't scrolling down all the way for some reason */}
        <View style={{ height: 110 }}></View>
      </View>
    </ScreenWrapper>
  )
}
