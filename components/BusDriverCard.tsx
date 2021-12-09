import React, { useState, useEffect }  from "react";
import { View, Text, Modal, TextInput, NativeSyntheticEvent, TextInputChangeEventData, Pressable, Image } from "react-native"
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Card } from "./Card"
import { useStyles } from "../context/styles.context"
import AsyncStorage from '@react-native-async-storage/async-storage';
import c4kBus from '../assets/images/C4K-Bus.png'

export const BusDriverCard = () => {
    
    const [busDriverModalOpen, setBusDriverModalOpen ] = useState(false);
    const [driverName, setDriverName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [busNumber, setBusNumber] = useState("")

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
        <Card overrideStyles={styles.busDriverCard}>
            <View>
            <View style={styles.budDriverCardHeader}>    
            
                <Text                    
                    style={{fontSize: 25,
                    color: "#FFF",
                    fontFamily: "Fregata-Sans",
                    lineHeight: 15,
                    textAlign: "left",
                    width: "70%",
                    paddingTop: 10,
                    flexWrap: "wrap",
                }}
                >
                    Bus Driver
                </Text>
            
                <Entypo 
                    name="squared-plus" 
                    size={24} 
                    color="#EF364B" 
                    onPress={() => setBusDriverModalOpen(true)}
                />
            
            </View>
            <View style={styles.busDriverCardInfo}>

                <View style={styles.busNumberBox}>
                    <Text style={styles.busTitleText}>BUS</Text>
                    <Text style={styles.busNumberText}>{busNumber}</Text>
                </View>
                <View style={styles.busDriverInfo}>
                    <Text style={styles.busDriverNameText}>{driverName}</Text>
                    <Text style={styles.busDriverPhoneText}>Phone: {phoneNumber}</Text>
                </View>
            </View>

            </View>
            <View>
                <Image 
                    source={c4kBus} 
                    style={{
                        width: 131,
                        height: 114,
                        marginLeft: 40,
                        
                      }}
                />
            </View>
                <Modal visible={busDriverModalOpen} animationType="slide">
                    <View>
                        <View>
                            <FontAwesome name="window-close" size={24} color="#EF364B" onPress={() => setBusDriverModalOpen(false)} />

                            <Text>Add Bus Driver Information</Text>
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
            
        </Card>
    )
}