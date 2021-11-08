import React, { useEffect, useState } from "react"
import { TouchableOpacity, Platform, Text, View, Image } from "react-native"
import { useStyles } from "../context/styles.context"
const BlinkIDReactNative = require("blinkid-react-native")
import firestore from "firebase/firestore"
import { addCollectionsToFirestoreMembers } from "../services/firestore.service"

const DriversLicenseScan = props => {
  const [driversLicense, setDriversLicense] = useState(null)
  const [userHasValidDriversLicenseAndMailchimpMember, setUserHasValidDriversLicenseAndMailchimpMember] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [updatedFirestoreUser, setUpdatedFirestoreUser] = useState(false)
  const [firestoreMembers, setFirestoreMembers] = useState([])
  const [fetch, setFetch] = useState({ complete: false })
  const { styles } = useStyles()

  useEffect(() => {
    setFirestoreMembers([])
    addCollectionsToFirestoreMembers(setFirestoreMembers, setFetch)
  }, [])

  useEffect(() => {
    try {
      if (!driversLicense) return () => {}
      setScanComplete(true)
      let driversLicenseLastNameMatchesFirestoreUser = false
      let driversLicenseFirstNameMatchesFirestoreUser = false
      let firestoreUser = null

      console.log("firestoreMembers: " + firestoreMembers.length)

      async function updateFirestoreUser(collection) {
        // await firestore()
        //   .collection(collection)
        //   .doc(firestoreUser.firestoreId)
        //   .update({
        //     driversLicense: firestoreUser.driversLicense,
        //     verified: true,
        //   });
        setUpdatedFirestoreUser(true)
      }

      function getMatch(matchingLastNames, driversLicense) {
        if (!matchingLastNames) return []
        const matchingFirstNames = matchingLastNames.filter(user => {
          const firstName = user.firstName.length > 0 ? user.firstName.toLowerCase().trim() : user.mailchimpMemberInfo.mergeFields.fname.toLowerCase().trim()
          return firstName === driversLicense.firstName.split(" ")[0].toLowerCase().trim()
        })
        console.log(`got ${matchingFirstNames.length} matching first names`)
        return matchingFirstNames
      }

      function getFirestoreUser() {
        const lastName = driversLicense.lastName.toLowerCase().trim()
        console.log(`looking for last name: ${lastName}`)
        let matchingLastNames = firestoreMembers.filter(m => {
          const foundMatch = m.lastNameLower === lastName
          return foundMatch
        })
        console.log(`got ${matchingLastNames.length} matching last names`)

        const match = getMatch(matchingLastNames, driversLicense)
        if (match.length === 1) {
          driversLicenseLastNameMatchesFirestoreUser = true
          driversLicenseFirstNameMatchesFirestoreUser = true
          firestoreUser = match[0]
        }

        if (firestoreUser) {
          // update firebase user
          console.log("found user")
          firestoreUser.driversLicense = driversLicense
          updateFirestoreUser(firestoreUser.collection)
        }
        let driversLicenseNameMatchesFirestoreUser = driversLicenseFirstNameMatchesFirestoreUser && driversLicenseLastNameMatchesFirestoreUser
        setUserHasValidDriversLicenseAndMailchimpMember(driversLicense.isValid && driversLicenseNameMatchesFirestoreUser)
      }
      getFirestoreUser()

      return () => {}
    } catch (error) {
      console.log(error)
    }
  }, [driversLicense])

  const licenseKey = Platform.select({
    ios: "sRwAAAEYYzRrLnNob3BwaW5nZXZlbnRtYW5hZ2Vy6nZboCR760oesrcYJhEwUtFtn1lCA9rZQQ6SKDYFo5njN3PcGHK/xud6f3GdfP01KDG0BSpyNfoh3rUTjZ5jgujK5sVraGF7NYaRWIe4TO9N42tzbxo2p9BUf3YDTd+AFOwxG/Yvmjaxa8SxiWEzPMgY+V7ywa51cop8xmhdwsZnBHfQSiusnR4zi6abqWJhyqLaIz5NdSPMrhNKIGx+4sQJptuhoToUPF0VacbBaiHhVOdGvhVn8T11IiuIRy4scM2ZA7QG4hM=",
    android:
      "sRwAAAAYYzRrLnNob3BwaW5nZXZlbnRtYW5hZ2VywHOxAZ8mS0vS6CNx2E6PPMS8YKjVAu5AjHW48lDpyHekecdNT86P275O7tnJLj9leratWVcy3tw6iW9vMcvvkSmeAMwvlcUToIDfvbN1MQl2yDXoB1kArjKNUpG1tKJEuAyeIOrzDUEoK35LLTjV3W2ZxjuQ/w0h9VfqjckhdZRJTKss4mDGy6YgTveXcVLHvfhgRk3XcGwZ9UQIgWkFUIhfspU0oDmvbDG6H9EhTv0k1q4cyU8B69wHHpGTUbXWyequN5AqDCQ=",
  })

  interface State {
    showImageDocument: boolean
    resultImageDocument: string
    showImageFace: boolean
    resultImageFace: string
    showSuccessFrame: boolean
    successFrame: string
    results: string
    licenseKeyErrorMessage?: string
  }

  const [state, setState] = React.useState<State>({
    showImageDocument: false,
    resultImageDocument: "",
    showImageFace: false,
    resultImageFace: "",
    showSuccessFrame: false,
    successFrame: "",
    results: "",
    licenseKeyErrorMessage: "",
  })

  const scan = async () => {
    try {
      // to scan any machine readable travel document (passports, visa's and IDs with
      // machine readable zone), use MrtdRecognizer
      // var mrtdRecognizer = new BlinkIDReactNative.MrtdRecognizer();
      // mrtdRecognizer.returnFullDocumentImage = true;

      // var mrtdSuccessFrameGrabber = new BlinkIDReactNative.SuccessFrameGrabberRecognizer(mrtdRecognizer);

      // BlinkIDRecognizer automatically classifies different document types and scans the data from
      // the supported document
      var blinkIdRecognizer = new BlinkIDReactNative.BlinkIdRecognizer()
      blinkIdRecognizer.returnFullDocumentImage = true
      blinkIdRecognizer.returnFaceImage = true

      const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
        new BlinkIDReactNative.BlinkIdOverlaySettings(),
        new BlinkIDReactNative.RecognizerCollection([blinkIdRecognizer /*, mrtdSuccessFrameGrabber*/]),
        licenseKey
      )

      if (scanningResults) {
        let newState = {
          showImageDocument: false,
          resultImageDocument: "",
          showImageFace: false,
          resultImageFace: "",
          results: "",
          showSuccessFrame: false,
          successFrame: "",
        }

        for (let i = 0; i < scanningResults.length; ++i) {
          let localState = handleResult(scanningResults[i])
          newState.showImageDocument = newState.showImageDocument || localState.showImageDocument
          if (localState.resultImageDocument) {
            newState.resultImageDocument = localState.resultImageDocument
          }
          newState.showImageFace = newState.showImageFace || localState.showImageFace
          if (localState.resultImageFace) {
            newState.resultImageFace = localState.resultImageFace
          }
          newState.results += localState.results
          newState.showSuccessFrame = newState.showSuccessFrame || localState.showSuccessFrame
          if (localState.successFrame) {
            newState.successFrame = localState.successFrame
          }
        }
        newState.results += "\n"
        setState(newState)
      }
    } catch (error) {
      console.log(error)
      setState({
        showImageDocument: false,
        resultImageDocument: "",
        showImageFace: false,
        resultImageFace: "",
        results: "Scanning has been cancelled",
        showSuccessFrame: false,
        successFrame: "",
      })
    }
  }

  const handleResult = result => {
    let fieldDelim = ";\n"

    let localState = {
      showImageDocument: false,
      resultImageDocument: "",
      showImageFace: false,
      resultImageFace: "",
      results: "",
      showSuccessFrame: false,
      successFrame: "",
    }

    if (result instanceof BlinkIDReactNative.BlinkIdRecognizerResult) {
      setDriversLicense({
        number: result.documentNumber,
        firstName: result.firstName,
        lastName: result.lastName,
        address: result.address,
        // address: {
        //   addr1: result.address.split('\n')[0],
        //   addr2: result.address.split('\n')[1],
        //   city: result.address.split('\n')[2].split(',')[0],
        //   state: result.addressresult.address
        //     .split('\n')[2]
        //     .split(',')[1]
        //     .trim()
        //     .substr(0, 2),
        //   zip: result.address.split('\n')[2].match(/\d+/g),
        // },
        dateOfBirth: new Date(parseInt(result.dateOfBirth.year), parseInt(result.dateOfBirth.month) - 1, parseInt(result.dateOfBirth.day)),
        expirationDate: new Date(parseInt(result.dateOfExpiry.year), parseInt(result.dateOfExpiry.month) - 1, parseInt(result.dateOfExpiry.day)),
        isValid: new Date(parseInt(result.dateOfExpiry.year), parseInt(result.dateOfExpiry.month) - 1, parseInt(result.dateOfExpiry.day)) > new Date(),
        issueDate: new Date(parseInt(result.dateOfIssue.year), parseInt(result.dateOfIssue.month) - 1, parseInt(result.dateOfIssue.day)) > new Date(),
        gender: result.sex,
      })

      // Document image is returned as Base64 encoded JPEG
      if (result.fullDocumentImage) {
        localState.showImageDocument = true
        localState.resultImageDocument = "data:image/jpg;base64," + result.fullDocumentImage
      }
      // Face image is returned as Base64 encoded JPEG
      if (result.faceImage) {
        localState.showImageFace = true
        localState.resultImageFace = "data:image/jpg;base64," + result.faceImage
      }
    } else if (result instanceof BlinkIDReactNative.MrtdRecognizerResult) {
      let mrtdResult = result
      localState.results +=
        "First name: " +
        mrtdResult.mrzResult.secondaryId +
        fieldDelim +
        "Last name: " +
        mrtdResult.mrzResult.primaryId +
        fieldDelim +
        "Nationality: " +
        mrtdResult.mrzResult.nationality +
        fieldDelim +
        "Gender: " +
        mrtdResult.mrzResult.gender +
        fieldDelim +
        "Date of birth: " +
        mrtdResult.mrzResult.dateOfBirth.day +
        "." +
        mrtdResult.mrzResult.dateOfBirth.month +
        "." +
        mrtdResult.mrzResult.dateOfBirth.year +
        "."

      // Document image is returned as Base64 encoded JPEG
      if (mrtdResult.fullDocumentImage) {
        localState.showImageDocument = true
        localState.resultImageDocument = "data:image/jpg;base64," + mrtdResult.fullDocumentImage
      }
    } else if (result instanceof BlinkIDReactNative.SuccessFrameGrabberRecognizerResult) {
      // first handle slave result, and then add success frame image
      localState = handleResult(result.slaveRecognizerResult)

      // success frame is returned as Base64 encoded JPEG
      if (result.successFrame) {
        localState.showSuccessFrame = true
        localState.successFrame = "data:image/jpg;base64," + result.successFrame
      }
    }
    return localState
  }

  let displayImageDocument = state.resultImageDocument
  let displayImageFace = state.resultImageFace
  let displaySuccessFrame = state.successFrame
  let displayFields = state.results
  //a lot of undefined styles here
  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        {/* <View style={styles.sectionContainer}>
          {fetch.complete && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={scan.bind(this)}>
                <Text style={styles.buttonText}> Scan </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.sectionContainer}>
          {state.showImageDocument && (
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                source={{ uri: displayImageDocument, scale: 3 }}
                style={styles.imageResult}
              />
            </View>
          )}
          {state.showImageFace && (
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                source={{ uri: displayImageFace, scale: 3 }}
                style={styles.imageResult}
              />
            </View>
          )}
          {state.showSuccessFrame && (
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                source={{ uri: displaySuccessFrame, scale: 3 }}
                style={styles.imageResult}
              />
            </View>
          )}
          <View style={styles.sectionContainer}>
            {scanComplete &&
              userHasValidDriversLicenseAndMailchimpMember &&
              updatedFirestoreUser && <Text style={styles.goodScan}>GOOD</Text>}
            {scanComplete && !userHasValidDriversLicenseAndMailchimpMember && (
              <Text style={styles.badScan}>Couldn't find exact match</Text>
            )}
            {scanComplete &&
              userHasValidDriversLicenseAndMailchimpMember &&
              !updatedFirestoreUser && (
                <Text style={styles.badScan}>
                  Couldn't update user license info
                </Text>
              )}
          </View>
          <View style={styles.sectionContainer}>
            {scanComplete && (
              <View style={styles.sectionContainer}>
                <Text>Name</Text>
                <Text style={styles.sectionTitle}>
                  {driversLicense.firstName.split(" ")[0]}{" "}
                  {driversLicense.lastName}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => props.navigation.pop()}
          >
            <Text style={styles.buttonText}> Close </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  )
}

export default DriversLicenseScan
