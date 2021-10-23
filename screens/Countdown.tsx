import moment from 'moment'
import { useState, useEffect } from 'react'
import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"

export const Countdown = ({timeTillDate, timeFormat}) => {
	const [monthsLeft, setMonthsLeft] = useState('')
	const [daysLeft, setDaysLeft] = useState('')
	const [hoursLeft, setHoursLeft] = useState('')
	const [minutesLeft, setMinutesLeft] = useState('')
	const [secondsLeft, setSecondsLeft] = useState('')
	
	useEffect(()=>{

		const interval = setInterval(() => {
			const eventDateTime:any = moment(timeTillDate, timeFormat);
			const now:any = moment();
			
            // Moment Duration object 
			const timeBeforeEvent = moment.duration(eventDateTime.diff(now))
            
            // Duration broken down - days includes total days for months left too
			const days = eventDateTime.diff(now, 'days') 
			const hours = timeBeforeEvent.get('hours')
			const minutes = timeBeforeEvent.get('minutes')
			const seconds = timeBeforeEvent.get('seconds')

            setDaysLeft(days)
            setHoursLeft(hours)
            setMinutesLeft(minutes)
            setSecondsLeft(seconds)
		}, 1000);
        return () => clearInterval(interval);   
    },[])


		
	return (
			<View style={styles.countdownWrapper}>
				{daysLeft && (
					<View style={styles.countdownItem}>
						{daysLeft} 
						<Text style={styles.countdownLabel}>days</Text>
					</View>
				)}
				{hoursLeft && (
					<View style={styles.countdownItem}>						
						{hoursLeft} 
						<Text style={styles.countdownLabel}>hours</Text>
					</View>
				)}
				{minutesLeft && (
					<View style={styles.countdownItem}>
						{minutesLeft} 
						<Text style={styles.countdownLabel}>minutes</Text>
					</View>
				)}
				
					<View style={styles.countdownItem}>
						{secondsLeft} 
						<Text style={styles.countdownLabel}>seconds</Text>
					</View>
				
			</View>
	)
	
}
const styles = StyleSheet.create({
    countdownWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    countdownItem: {
        color: "#FFF",
        fontSize: 20,
        display: "flex",
        flexDirection: "row",
        margin: 2,
        paddingTop: 2,
        position: "relative",
 
    },
    countdownLabel: {
        color: "#FFF",
        fontSize: 12,
        fontWeight: "600",
        textTransform: "uppercase"
    }
    
  

})
  