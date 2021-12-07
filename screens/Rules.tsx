import React, { useState, useEffect } from "react"
import { Text, View } from "react-native"
import { fetchRules } from "../services/firestore.service"
import { Loading } from "./Loading"
import { useStyles } from "../context/styles.context"
import { useUser } from "../context/user.context"
import ScreenWrapper from "./ScreenWrapper"
import StickyScreenWrapper from "./StickyScreenWrapper"
import { Card } from "../components/Card"
import RulesGroup from "../components/RulesGroup"

export const Rules = () => {
  const [rules, setRules] = useState([])
  const [groupedRules, setGroupedRules] = useState([])

  const { styles } = useStyles()
  const { user } = useUser()
  console.log("volunteerType", user.volunteerType)
  // const volunteerType = user.volunteerType.slice(5) //removes 2021_ prefix
  const volunteerType = "ADMIN"

  useEffect(() => {
    fetchRules().then((data) => {
      setRules(data.data)
    })
  }, [])

  useEffect(() => {
    const uniqueGroups = [
      ...new Set(
        rules
          .filter((rule) => rule.volunteerTypes?.includes(volunteerType))
          .map((rule) => rule.group)
      ),
    ]
    const gRules = []
    for (const group of uniqueGroups) {
      const orderedGroupRulesByGroup = rules
        .filter((rule) => rule.group === group)
        .sort((first, last) => first.order - last.order)
      gRules.push({ group, rules: orderedGroupRulesByGroup })
    }
    // sorts the groups themselves
    gRules.sort((first, last) => first.rules[0].order - last.rules[0].order)
    setGroupedRules(gRules)
  }, [rules])

  return (
    <StickyScreenWrapper>
      {rules.length > 0 ? (
        groupedRules.map((item, index) => (
          <RulesGroup key={index} rules={item.rules} groupName={item.group} />
        ))
      ) : (
        <Loading />
      )}
      <RulesGroup
        rules={[
          {
            description:
              "The children and the Christmas4Kids Staff want to thank you again for spending your day with us - we hope you enjoy it as much as we do! If you need anything or have any questions do not hesitate to call.",
          },
        ]}
        groupName={"Thank You!"}
      />
      {/* Added this blank View so that very last rule card displays. it wasn't scrolling down all the way for some reason */}
      <View style={{ height: 110 }}></View>
    </StickyScreenWrapper>
  )
}
