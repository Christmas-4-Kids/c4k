import React, { useState, useEffect }  from "react";
import { View, Text, Modal, TextInput, NativeSyntheticEvent, TextInputChangeEventData, Pressable } from "react-native"
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Card } from "./Card"
import { useStyles } from "../context/styles.context"

import AsyncStorage from '@react-native-async-storage/async-storage';


export const BusDriverCard = () => {
    
    const [busDriverModalOpen, setBusDriverModalOpen ] = useState(false);
    const [driverName, setDriverName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [busNumber, setBusNumber] = useState("")
    // const [driverInfo, setDriverInfo] = useState({})

    const { styles } = useStyles()

    const storeDriverInfo = async (busDriver) => {
        try {
          const jsonValue = JSON.stringify(busDriver)
          await AsyncStorage.setItem('driverInfo', jsonValue)
        } catch (e) {
           alert(e)
        }
      }
    
      const getDriverInfo = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('driverInfo')
          const driverInfo = JSON.parse(jsonValue)

          if(driverInfo !== null){
              setDriverName(driverInfo.driverName)
              setPhoneNumber(driverInfo.phoneNumber)
              setBusNumber(driverInfo.busNumber)
          }
        } catch(e) {
          // error reading value
        }
      }

      useEffect(() => {
        getDriverInfo()
      }, [])

    return (
        <Card>
            <View>    
                <Entypo 
                    name="squared-plus" 
                    size={24} 
                    color="#EF364B" 
                    onPress={() => setBusDriverModalOpen(true)}
                />

                <Modal visible={busDriverModalOpen} animationType="slide">
                    <View>
                        <View>
                            <FontAwesome name="window-close" size={24} color="#EF364B" onPress={() => setBusDriverModalOpen(false)} />

                            <Text>Hello from Bus Driver Form</Text>
                            <View style={styles.textInputView}>
                        
                                <TextInput
                                    style={styles.textInput}
                                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setDriverName(e.nativeEvent.text)}
                                    placeholder="driver's name"
                                    value={driverName}
                                    returnKeyType="next"
                                    returnKeyLabel="next"
                                    autoFocus={true}
                                />
                            </View>
                            <View style={styles.textInputView}>
                        
                                <TextInput
                                    style={styles.textInput}
                                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setPhoneNumber(e.nativeEvent.text)}
                                    placeholder="phone number"
                                    value={phoneNumber}
                                    keyboardType="phone-pad"
                                    returnKeyType="next"
                                    returnKeyLabel="next"
                                    autoFocus={true}
                                />
                            </View>
                            <View style={styles.textInputView}>
                        
                                <TextInput
                                    style={styles.textInput}
                                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setBusNumber(e.nativeEvent.text)}
                                    placeholder="bus #"
                                    value={busNumber}
                                    keyboardType="phone-pad"
                                    returnKeyType="next"
                                    returnKeyLabel="next"
                                    autoFocus={true}
                                />
                            </View>
                            <Pressable 
                                style={styles.button} 
                                onPress={() => {
                                    storeDriverInfo({driverName, phoneNumber, busNumber})
                                    setBusDriverModalOpen(false)
                                }}>
                                <Text style={styles.buttonText}>{"Save Driver Info"}</Text>
                            </Pressable>
                        </View>

                    </View>
                </Modal>
                <Text>Driver Name: {driverName}</Text>
                <Text>Bus: {busNumber}</Text>
                <Text>Phone: {phoneNumber}</Text>
            </View>
        </Card>
    )
}