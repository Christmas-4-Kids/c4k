import React, { useEffect, useState } from "react"
import { View, Text, Pressable, Modal } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"
import { useStyles } from "../context/styles.context"
import { useVolunteers, Volunteer } from "../context/volunteer.context"
import { Card } from "../components/Card"
import { AntDesign } from "@expo/vector-icons"
import { updateVolunteerCheckedIn } from "../services/firestore.service"

const licenseCodeToVolunteerMap: Map<string, string> = new Map([
  ["Given Name", "firstName"],
  ["First Name", "firstName"],
  ["Family Name", "lastName"],
  ["Last Name", "lastName"],
  ["Mailing Street Address1", "addr1"],
  ["Mailing Street Address2", "addr2"],
  ["Mailing City", "city"],
  ["Mailing Jurisdiction Code", "state"],
  ["Mailing Postal Code", "zip"],
  ["Residence Street Address1", "addr1"],
  ["Residence Street Address2", "addr2"],
  ["Residence City", "city"],
  ["Residence Jurisdiction Code", "state"],
  ["Residence Postal Code", "zip"],
])

const pdf417Map: Map<string, string> = new Map([
  ["DAA", "Full Name"],
  ["DAB", "Family Name"],
  ["DAC", "Given Name"],
  ["DAD", "Middle Name"],
  ["DAE", "Name Suffix"],
  ["DAF", "Name Prefix"],
  ["DAG", "Mailing Street Address1"],
  ["DAH", "Mailing Street Address2"],
  ["DAI", "Mailing City"],
  ["DAJ", "Mailing Jurisdiction Code"],
  ["DAK", "Mailing Postal Code"],
  ["DAL", "Residence Street Address1"],
  ["DAM", "Residence Street Address2"],
  ["DAN", "Residence City"],
  ["DAO", "Residence Jurisdiction Code"],
  ["DAP", "Residence Postal Code"],
  ["DAQ", "License or ID Number"],
  ["DAR", "License Classification Code"],
  ["DAS", "License Restriction Code"],
  ["DAT", "License Endorsements Code"],
  ["DAU", "Height in FT_IN"],
  ["DAV", "Height in CM"],
  ["DAW", "Weight in LBS"],
  ["DAX", "Weight in KG"],
  ["DAY", "Eye Color"],
  ["DAZ", "Hair Color"],
  ["DBA", "License Expiration Date"],
  ["DBB", "Date of Birth"],
  ["DBC", "Sex"],
  ["DBD", "License or ID Document Issue Date"],
  ["DBE", "Issue Timestamp"],
  ["DBF", "Number of Duplicates"],
  ["DBG", "Medical Indicator Codes"],
  ["DBH", "Organ Donor"],
  ["DBI", "Non-Resident Indicator"],
  ["DBJ", "Unique Customer Identifier"],
  ["DBK", "Social Security Number"],
  ["DBL", "Date Of Birth"],
  ["DBM", "Social Security Number"],
  ["DBN", "Full Name"],
  ["DBO", "Family Name"],
  ["DBP", "Given Name"],
  ["DBQ", "Middle Name or Initial"],
  ["DBR", "Suffix"],
  ["DBS", "Prefix"],
  ["DCA", "Virginia Specific Class"],
  ["DCB", "Virginia Specific Restrictions"],
  ["DCD", "Virginia Specific Endorsements"],
  ["DCE", "Physical Description Weight Range"],
  ["DCF", "Document Discriminator"],
  ["DCG", "Country territory of issuance"],
  ["DCH", "Federal Commercial Vehicle Codes"],
  ["DCI", "Place of birth"],
  ["DCJ", "Audit information"],
  ["DCK", "Inventory Control Number"],
  ["DCL", "Race Ethnicity"],
  ["DCM", "Standard vehicle classification"],
  ["DCN", "Standard endorsement code"],
  ["DCO", "Standard restriction code"],
  ["DCP", "Jurisdiction specific vehicle classification description"],
  ["DCQ", "Jurisdiction-specific"],
  ["DCR", "Jurisdiction specific restriction code description"],
  ["DCS", "Last Name"],
  ["DCT", "First Name"],
  ["DCU", "Suffix"],
  ["DDA", "Compliance Type"],
  ["DDB", "Card Revision Date"],
  ["DDC", "HazMat Endorsement Expiry Date"],
  ["DDD", "Limited Duration Document Indicator"],
  ["DDE", "Family Name Truncation"],
  ["DDF", "First Names Truncation"],
  ["DDG", "Middle Names Truncation"],
  ["DDH", "Under 18 Until"],
  ["DDI", "Under 19 Until"],
  ["DDJ", "Under 21 Until"],
  ["DDK", "Organ Donor Indicator"],
  ["DDL", "Veteran Indicator"],
  ["PAA", "Permit Classification Code"],
  ["PAB", "Permit Expiration Date"],
  ["PAC", "Permit Identifier"],
  ["PAD", "Permit IssueDate"],
  ["PAE", "Permit Restriction Code"],
  ["PAF", "Permit Endorsement Code"],
  ["ZVA", "Court Restriction Code"],
])

const getVolunteerType = (volunteerType: string) => {
  switch (volunteerType) {
    case "2021_ADMIN":
      return "Organizer"
    case "2021_ALL_DAY_CHAPERONE":
      return "All Day Chaperone"
    case "2021_EVENING_CHAPERONE":
      return "Evening Chaperone"
    case "2021_LEBANON_CHAPERONE":
      return "Lebanon Chaperone"
    case "2021_DRIVER":
      return "Driver"
    default:
      return "Unknown"
  }
}

export const ScanDriversLicense = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [volunteerMatches, setVolunteerMatches] = useState<Volunteer[]>([])
  const { styles } = useStyles()
  const { volunteers } = useVolunteers()

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  useEffect(() => {
    const volunteerMatchesIds = volunteerMatches.map(v => v.mailchimpMemberId)
    setVolunteerMatches(volunteers.filter(v => volunteerMatchesIds.includes(v.mailchimpMemberId)))
  }, [volunteers])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    const driversLicenseArr: string[] = data.split(/\r?\n/)
    const volunteerProperties: Map<string, string> = new Map()
    for (const dlItem of driversLicenseArr) {
      if (dlItem.length < 4) continue
      const key = dlItem.slice(0, 3)
      const value = dlItem.slice(3)
      if (value.length <= 1) continue
      const licenseProperty = pdf417Map.get(key)
      const volunteerProperty = licenseCodeToVolunteerMap.get(licenseProperty)
      volunteerProperties.set(volunteerProperty, value.toLowerCase().trim())
    }
    let matches: Volunteer[] = []
    for (const volunteer of volunteers) {
      if (volunteer.firstName.toLowerCase() === volunteerProperties.get("firstName") && volunteer.lastNameLower === volunteerProperties.get("lastName")) {
        matches = [...matches, volunteer]
      }
    }
    setVolunteerMatches(matches)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  const onPress = async (volunteer: Volunteer) => {
    const data = { checkedIn: !volunteer?.checkedIn, refId: volunteer?.mailchimpMemberId }
    await updateVolunteerCheckedIn(data)
  }
  return (
    <View style={styles.page}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={scanned}
        onRequestClose={() => {
          setScanned(!scanned)
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <Card>
            {volunteerMatches.length === 0 ? (
              <View>
                <Text style={{ fontFamily: "FjallaOne", fontSize: 18, textAlign: "center" }}>No Matches Found</Text>
              </View>
            ) : (
              volunteerMatches.map(volunteer => (
                <View key={volunteer.mailchimpMemberId}>
                  <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "column", alignItems: "flex-start", width: "68%" }}>
                      <Text style={styles.chaperoneListItemName}>{`${volunteer?.firstName} ${volunteer?.lastName}`}</Text>
                      <Text style={styles.chaperoneListItemVolunteerType}>{getVolunteerType(volunteer?.volunteerType)}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignContent: "flex-end" }}>
                      {volunteer?.spanish === "Yes" ? <Text style={styles.searchFilterPillTextOn}>Esp</Text> : null}
                      {volunteer?.medical !== "None" ? <Text style={styles.searchFilterPillTextOn}>Med</Text> : null}
                    </View>
                    <Pressable
                      style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                        width: 30,
                      })}
                      onPress={() => onPress(volunteer)}
                    >
                      <Text style={volunteer?.checkedIn ? styles.volunteerCheckedIn : styles.volunteerNotCheckedIn}>
                        {volunteer?.checkedIn ? <AntDesign name="checksquare" size={28} color="green" /> : <AntDesign name="checksquare" size={28} color="gray" />}
                      </Text>
                    </Pressable>
                  </View>
                  <View style={styles.upcomingEventsCardDivider}></View>
                </View>
              ))
            )}
            <Pressable
              style={({ pressed }) => [
                styles.button,
                {
                  opacity: pressed ? 0.5 : 1,
                  marginTop: 20,
                },
              ]}
              onPress={() => setScanned(!scanned)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </Card>
        </View>
      </Modal>
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }} />
    </View>
  )
}
