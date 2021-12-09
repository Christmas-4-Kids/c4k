import React  from "react";
import { View, Text } from "react-native"
import { useStyles } from "../context/styles.context"
import { Card } from "./Card"

export const HomeWelcomeCard = () => {
    const { styles } = useStyles()
    return (
        <Card overrideStyles={styles.homeWelcomeCard}>
            <View style={styles.homeWelcomeInnerCard}>    
                <View style={{width: 100, height: 80, }}>
                <Text style={styles.welcomeCardHeaderText}> Today is the big day</Text>
                </View>
                <View style={styles.welcomeCardBody}>
                    <Text style={styles.welcomeCardBodyText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                </View>
            </View>
        </Card>
    )
}