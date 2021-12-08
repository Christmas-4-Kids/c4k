import React, { useState }  from "react";
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
    const [busNumber, setbusNumber] = useState("")

    const { styles } = useStyles()
    // const storeData = async (value) => {
    //     try {
    //       const jsonValue = JSON.stringify(value)
    //       await AsyncStorage.setItem('@storage_Key', jsonValue)
    //     } catch (e) {
    //       // saving error
    //     }
    //   }

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
                                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setbusNumber(e.nativeEvent.text)}
                                    placeholder="bus #"
                                    value={busNumber}
                                    keyboardType="phone-pad"
                                    returnKeyType="next"
                                    returnKeyLabel="next"
                                    autoFocus={true}
                                />
                            </View>
                            <Pressable style={styles.button} onPress={() => console.log('save data')}>
                    <Text style={styles.buttonText}>{"Save Driver Info"}</Text>
                            </Pressable>
                        </View>

                    </View>
                </Modal>
                    
                <Text>Bus Driver</Text>
            </View>
        </Card>
    )
}