import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';

function generateRandomBetween(min, max, exclude) {
	const rndNum = Math.floor(Math.random() * (max - min)) + min;

	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
}

let minBoundry = 1;
let maxBoundry = 100;

function GameScreen({ userNumber }) {
	const initialGuess = generateRandomBetween(
		minBoundry,
		maxBoundry,
		userNumber
	);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);

	function nextGuessHandler(direction) {
		if (
			(direction === 'lower' &&
				currentGuess < userNumber) ||
			(direction === 'greater' &&
				currentGuess > userNumber)
		) {
			Alert.alert(
				"Don't lie !",
				'You know that this is wrong ...',
				[{ text: 'Sorry!', style: 'cancel' }]
			);
			return;
		}
		if (direction === 'lower') {
			maxBoundry = currentGuess;
		} else {
			minBoundry = currentGuess + 1;
		}
		const newRndNumber = generateRandomBetween(
			minBoundry,
			maxBoundry,
			currentGuess
		);
		setCurrentGuess(newRndNumber);
	}

	return (
		<View style={styles.screen}>
			<Title>Opponent's Guess </Title>
			<NumberContainer>{currentGuess}</NumberContainer>
			<View>
				<Text>Higher or lower?</Text>
				<View>
					<PrimaryButton
						onPress={nextGuessHandler.bind(
							this,
							'lower'
						)}
					>
						-
					</PrimaryButton>
					<PrimaryButton
						onPress={nextGuessHandler.bind(
							this,
							'greater'
						)}
					>
						+
					</PrimaryButton>
				</View>
			</View>
			<View>
				<Text>LOG ROUNDS</Text>
			</View>
		</View>
	);
}

export default GameScreen;
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
	},
});
