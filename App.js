import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
// import { useFonts } from 'expo-font';

export default function App() {
	const [userNumber, setUserNumber] = useState('');
	const [gameIsOver, setGameIsOver] = useState(true);
	const [guessRounds, setGuessRounds] = useState(0);

	// const [fontsLoaded] = useFonts({
	// 	'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
	// 	'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	// });

	function pickedNumberHandler(pickedNumber) {
		setUserNumber(pickedNumber);
		setGameIsOver(false);
	}
	function gameOverHandler(numberOfRounds) {
		setGameIsOver(true);
		setGuessRounds(numberOfRounds);
	}

	function startNewGameHandler() {
		setUserNumber(null);
		setGuessRounds(0);
	}
	let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

	if (userNumber) {
		screen = (
			<GameScreen
				userNumber={userNumber}
				onGameOver={gameOverHandler}
			/>
		);
	}
	if (gameIsOver && userNumber) {
		screen = (
			<GameOverScreen
				userNumber={userNumber}
				roundsNumber={guessRounds}
				onStartNewGame={startNewGameHandler}
			/>
		);
	}

	return (
		<LinearGradient
			colors={['#4e0329', '#ddb52f']}
			style={styles.rootScreen}
		>
			<ImageBackground
				source={require('./assets/image/background.png')}
				resizeMode="cover"
				style={styles.rootScreen}
				imageStyle={styles.backGroundImage}
			>
				<SafeAreaView style={styles.rootScreen}>
					{screen}
				</SafeAreaView>
			</ImageBackground>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	rootScreen: {
		flex: 1,
	},
	backGroundImage: {
		opacity: 0.2,
	},
});
