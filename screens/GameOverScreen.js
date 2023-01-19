import { Image, View, StyleSheet, Text, Dimensions } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
	return (
		<View style={styles.rootContainer}>
			<Title>Game Over</Title>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={require('../assets/image/success.png')}
				/>
			</View>
			<Text style={styles.summaryText}>
				Your phone needed{' '}
				<Text style={styles.highLight}>
					{roundsNumber}
				</Text>{' '}
				rounds to guess the number{' '}
				<Text style={styles.highLight}>
					{userNumber}
				</Text>
				.
			</Text>
			<PrimaryButton onPress={onStartNewGame}>
				Start New Game
			</PrimaryButton>
		</View>
	);
}

export default GameOverScreen;

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		width: deviceWidth < 380 ? 150 : 300,
		height: deviceWidth < 380 ? 150 : 300,
		borderRadius: deviceWidth < 380 ? 75 : 150,
		borderWidth: 3,
		borderColor: Colors.primary500,
		overflow: 'hidden',
		margin: 36,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	summaryText: {
		fontWeight: 'normal',
		fontSize: 24,
		textAlign: 'center',
		marginBottom: 24,
	},
	highLight: {
		fontWeight: 'bold',
		color: Colors.primary500,
	},
});
