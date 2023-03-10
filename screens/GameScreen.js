import { useEffect, useState } from 'react';
import { Alert, FlatList, View, StyleSheet } from 'react-native';
import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';

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

function GameScreen({ userNumber, onGameOver }) {
	const initialGuess = generateRandomBetween(1, 100, userNumber);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [guessRounds, setGuessRounds] = useState([initialGuess]);

	useEffect(() => {
		if (currentGuess === userNumber) {
			onGameOver(guessRounds.length);
		}
	}, [currentGuess, userNumber, onGameOver]);

	useEffect(() => {
		minBoundry = 1;
		maxBoundry = 100;
	}, []);
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
		setGuessRounds((prevGuessRounds) => [
			newRndNumber,
			...prevGuessRounds,
		]);
	}

	const guessRoundListLength = guessRounds.length;

	return (
		<View style={styles.screen}>
			<Title>Opponent's Guess </Title>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card>
				<InstructionText
					style={styles.instructionText}
				>
					Higher Or Lower
				</InstructionText>
				<View style={styles.buttoncontainer}>
					<View style={styles.button}>
						<PrimaryButton
							onPress={nextGuessHandler.bind(
								this,
								'lower'
							)}
						>
							<Ionicons
								name="md-remove"
								size={
									24
								}
								color="white"
							/>
						</PrimaryButton>
					</View>

					<View style={styles.button}>
						<PrimaryButton
							onPress={nextGuessHandler.bind(
								this,
								'greater'
							)}
						>
							<Ionicons
								name="md-add"
								size={
									24
								}
								color="white"
							/>
						</PrimaryButton>
					</View>
				</View>
			</Card>
			<View style={styles.listContainer}>
				<FlatList
					data={guessRounds}
					renderItem={(itemData) => (
						<GuessLogItem
							roundNumber={
								guessRoundListLength -
								itemData.index
							}
							guess={
								itemData.item
							}
						/>
					)}
					keyExtractor={(item) => item}
				/>
			</View>
		</View>
	);
}

export default GameScreen;
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
		alignItems: 'center',
	},
	buttoncontainer: {
		flexDirection: 'row',
	},
	button: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
		padding: 16,
	},
	instructionText: {
		marginBottom: 12,
	},
});
