import React, { useEffect } from "react"
import { ScrollView, View, Text, Button, TouchableOpacity } from "react-native"
import { useStyles } from "../context/styles.context"
import call from "react-native-phone-call"
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faTimes, faCheck, faMobile } from "@fortawesome/free-solid-svg-icons";

function MemberList(props: any) {
  const makeCall = (number) => {
    const args = {
      number: number, // String value with the number to call
      prompt: true, // Optional boolean property. Determines if the user should be prompt prior to the call
    }
    call(args).catch(console.error)
  }
  const styles = useStyles().styles
  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View>
            {!!props.memberList &&
              props.memberList.length > 0 &&
              props.memberList.map((member) => (
                <View style={styles.member} key={member.firestoreId}>
                  <View style={styles.memberRow}>
                    <View style={styles.memberColumn}>
                      <Text style={styles.memberName}>
                        {member.firstName} {member.lastName}
                      </Text>
                      <Text style={styles.memberAddress}>
                        {!!member.driversLicense &&
                          member.driversLicense.address}
                      </Text>
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
                      <Button
                        title="Call"
                        onPress={() =>
                          makeCall(member.phone.replace(/\D/g, ""))
                        }
                      />
                    </View>
                  </View>
                </View>
              ))}
            {!props.memberList && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>Loading...</Text>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => props.navigation.pop()}
          >
            <Text style={styles.buttonText}> Close </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default MemberList
