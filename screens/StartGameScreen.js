import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
	TextInput,
	View,
	Alert,
	useWindowDimensions,
	KeyboardAvoidingView,
} from 'react-native';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';

function StartGameScreen({ onPickNumber }) {
	const [enteredNumber, setEnteredNumber] = useState('');
	const { width, height } = useWindowDimensions();

	function numberInputHandler(enteredText) {
		setEnteredNumber(enteredText);
	}

	function resetInputHandler() {
		setEnteredNumber('');
	}

	function confirmInputHandler() {
		const chosenNumber = parseInt(enteredNumber);

		if (
			isNaN(chosenNumber) ||
			chosenNumber <= 0 ||
			chosenNumber > 99
		) {
			//show alert
			Alert.alert(
				'invalid number',
				'Number has to be a number between 1 and 99.',
				[
					{
						text: 'Okay',
						style: 'destructive',
						onPress: resetInputHandler,
					},
				]
			);
			return;
		}
		onPickNumber(chosenNumber);
	}

	const marginTopDistance = height < 380 ? 30 : 100;
	return (
		<ScrollView style={styles.screen}>
			<KeyboardAvoidingView
				style={styles.screen}
				behavior="position"
			>
				<View
					style={[
						styles.rootContainer,
						{
							marginTop: marginTopDistance,
						},
					]}
				>
					<Title>Guess My Number</Title>
					<Card>
						<InstructionText>
							Enter a
							Number
						</InstructionText>
						<TextInput
							style={
								styles.numberInput
							}
							maxLength={
								2
							}
							keyboardType="number-pad"
							autoCapitalize="none"
							autoCorrect={
								false
							}
							onChangeText={
								numberInputHandler
							}
							value={
								enteredNumber
							}
						/>
						<View
							style={
								styles.buttoncontainer
							}
						>
							<View
								style={
									styles.button
								}
							>
								<PrimaryButton
									onPress={
										resetInputHandler
									}
								>
									Reset
								</PrimaryButton>
							</View>
							<View
								style={
									styles.button
								}
							>
								<PrimaryButton
									onPress={
										confirmInputHandler
									}
								>
									Confirm
								</PrimaryButton>
							</View>
						</View>
					</Card>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
}

export default StartGameScreen;

// const deviceHieght = Dimensions.get('window').height;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	rootContainer: {
		flex: 1,
		// marginTop: marginTopDistance,
		alignItems: 'center',
	},

	numberInput: {
		height: 50,
		width: 50,
		fontSize: 32,
		borderBottomColor: Colors.accent500,
		borderBottomWidth: 2,
		color: Colors.accent500,
		marginVertical: 8,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	buttoncontainer: {
		flexDirection: 'row',
	},
	button: {
		flex: 1,
	},
	instructionText: {
		color: Colors.accent500,
		fontSize: 24,
	},
});
