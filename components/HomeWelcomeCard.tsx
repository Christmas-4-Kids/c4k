import React  from "react";
import { View, Text } from "react-native"
import { Card } from "./Card"

export const HomeWelcomeCard = () => {
    return (
        <Card>
            <View>    
                <Text> Today is the big day</Text>
            </View>
        </Card>
    )
}


// <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
// <View style={{ flex: 1 }}>
//   <ImageBackground source={backgroundImage} style={{ height: 800, width: "auto", overflow: "hidden" }}>
//     <Image
//       source={logo}
//       style={{
//         width: 166,
//         height: 170,
//         alignSelf: "center",
//         marginTop: "35%",
//       }}
//     />
//   </ImageBackground>
//   {isLoading ? <Loading /> : null}

//   <View style={styles.checkInWrapper}>
//     <Text style={styles.checkInTitle}>Let's Get You Checked In</Text>

//     {errorMessage.length > 0 ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
//     {showRegistration ? (
//       <OpenUrlLink styles={styles.register} url="https://christmas4kids.org/volunteer/">
//         Tap Here to Register
//       </OpenUrlLink>
//     ) : null}
//     {!phoneNumberIsVerified || !userIsUpdatedInFirestore ? (
//       <>
//         <Text style={styles.checkInSubtitle}>In the form below, enter the phone number & email that you registered with.</Text>
//         <View style={styles.textInputView}>
//           <Ionicons name="call" style={styles.textInputIcon} />
//           <TextInput
//             style={styles.textInput}
//             onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setPhoneNumber(e.nativeEvent.text)}
//             placeholder="phone number"
//             value={phoneNumber}
//             keyboardType="phone-pad"
//             returnKeyType="next"
//             returnKeyLabel="next"
//             autoFocus={true}
//           />
//         </View>
//         <View style={styles.textInputView}>
//           <Ionicons name="mail" style={styles.textInputIcon} />
//           <TextInput
//             style={styles.textInput}
//             onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setEmail(e.nativeEvent.text)}
//             value={email}
//             placeholder="email address"
//             keyboardType="email-address"
//             returnKeyType="done"
//             returnKeyLabel="done"
//           />
//         </View>
//         <Pressable disabled={verifyButtonDisabled} style={verifyButtonDisabled ? styles.buttonDisabled : styles.button} onPress={verifyRegistration}>
//           <Text style={styles.buttonText}>{"VERIFY REGISTRATION"}</Text>
//         </Pressable>
//       </>
//     ) : (
//       <>
//         <Text style={styles.checkInSubtitle}>Enter the Verification Code you just received.</Text>
//         <View style={styles.textInputView}>
//           <Feather name="check" style={styles.textInputIcon} />
//           <TextInput
//             style={styles.textInput}
//             placeholder="verification code"
//             onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setVerificationCode(e.nativeEvent.text)}
//             value={verificationCode}
//             maxLength={5}
//             returnKeyType="done"
//             returnKeyLabel="done"
//           />
//         </View>
//         <Pressable disabled={verifyButtonDisabled} style={submitButtonDisabled ? styles.buttonDisabled : styles.button} onPress={verifyUser}>
//           <Text style={styles.buttonText}>{"SUBMIT"}</Text>
//         </Pressable>
//       </>
//     )}
//   </View>
// </View>
// </KeyboardAvoidingView>