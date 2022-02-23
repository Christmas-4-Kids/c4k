import React, { useEffect } from "react"
import { ScrollView, View, Text, Button, TouchableOpacity } from "react-native"
import { useStyles } from "../context/styles.context"
import call from "react-native-phone-call"
import { C4kText } from "../components/C4kText"
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faTimes, faCheck, faMobile } from "@fortawesome/free-solid-svg-icons";

function MemberList(props: any) {
  const makeCall = number => {
    const args = {
      number: number, // String value with the number to call
      prompt: true, // Optional boolean property. Determines if the user should be prompt prior to the call
    }
    call(args).catch(console.error)
  }
  const { styles } = useStyles()
  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
          <View>
            {!!props.memberList &&
              props.memberList.length > 0 &&
              props.memberList.map(member => (
                <View style={styles.member} key={member.firestoreId}>
                  <View style={styles.memberRow}>
                    <View style={styles.memberColumn}>
                      <C4kText style={styles.memberName}>
                        {member.firstName} {member.lastName}
                      </C4kText>
                      <C4kText style={styles.memberAddress}>{!!member.driversLicense && member.driversLicense.address}</C4kText>
                    </View>
                    <View>
                      {/* {member.type && (
                        <FontAwesomeIcon
                          icon={faMobile}
                          size={25}
                          color={"green"}
                        />
                      )}
                      {!member.type && (
                        <FontAwesomeIcon
                          icon={faMobile}
                          size={25}
                          color={"lightgray"}
                        />
                      )} */}
                    </View>
                    <View>
                      {/* {member.verified && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          size={30}
                          color={"green"}
                        />
                      )}
                      {!member.verified && (
                        <FontAwesomeIcon
                          icon={faTimes}
                          size={30}
                          color={"red"}
                        />
                      )} */}
                    </View>
                    <View>
                      <Button title="Call" onPress={() => makeCall(member.phone.replace(/\D/g, ""))} />
                    </View>
                  </View>
                </View>
              ))}
            {!props.memberList && (
              <View style={styles.sectionContainer}>
                <C4kText style={styles.sectionText}>Loading...</C4kText>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => props.navigation.pop()}>
            <C4kText style={styles.buttonText}> Close </C4kText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default MemberList
