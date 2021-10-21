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
			// const { timeTillDate, timeFormat } = props;
			const then:any = moment(timeTillDate, timeFormat);
			const now:any = moment();
			const countdown = moment(then - now);
			const months = countdown.format('M');
			const days = countdown.format('D');
			const hours = countdown.format('HH');
			const minutes = countdown.format('mm');
			const seconds = countdown.format('ss');

            setMonthsLeft(months)
            setDaysLeft(days)
            setHoursLeft(hours)
            setMinutesLeft(minutes)
            setSecondsLeft( seconds)
		}, 1000);
        return () => clearInterval(interval);   
    },[daysLeft, hoursLeft, minutesLeft, secondsLeft])


		
	return (
			<View style={styles.countdownWrapper}>
                {monthsLeft && (
					<View style={styles.countdownItem}>
						{monthsLeft} 
						<Text style={styles.countdownLabel}>months</Text>
					</View>
				)}
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
				{secondsLeft && (
					<View style={styles.countdownItem}>
						{secondsLeft} 
						<Text style={styles.countdownLabel}>seconds</Text>
					</View>
				)}
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
  