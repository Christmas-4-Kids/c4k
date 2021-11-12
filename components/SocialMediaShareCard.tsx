import React from 'react'
import { View, Text } from 'react-native'
import { useStyles } from "../context/styles.context"

const SocialMediaShareCard = () => {
	const { styles } = useStyles()

	return (
		<View style={styles.socialMediaShareCard}>
			<Text>test</Text>
		</View>
	)
}

export default SocialMediaShareCard
