import { Text, View, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

function GuessLogItem({ roundNumber, guess }) {
	return (
		<View style={styles.listItem}>
			<Text>#{roundNumber}</Text>
			<Text>Opponents's Guess:{guess}</Text>
		</View>
	);
}

export default GuessLogItem;

const styles = StyleSheet.create({
	listItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		elevation: 4,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.25,
		shadowRadius: 3,
		borderColor: Colors.primary500,
		borderWidth: 1,
		borderRadius: 40,
		padding: 12,
		marginVertical: 8,
		backgroundColor: Colors.accent500,
	},
});
