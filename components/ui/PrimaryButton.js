import { StyleSheet } from 'react-native';
import { View, Text, Pressable } from 'react-native';
import Colors from '../../constants/colors';

function PrimaryButton({ children, onPress }) {
	return (
		<View style={styles.buttonOuterContainer}>
			<Pressable
				style={({ pressed }) =>
					pressed
						? [
								styles.pressed,
								styles.buttonInnerContainer,
						  ]
						: styles.buttonInnerContainer
				}
				onPress={onPress}
				android_ripple={{ color: 'white' }}
			>
				<Text style={styles.button}>
					{children}
				</Text>
			</Pressable>
		</View>
	);
}

export default PrimaryButton;

const styles = StyleSheet.create({
	buttonOuterContainer: {
		borderRadius: 28,
		margin: 4,
		overflow: 'hidden',
	},
	buttonInnerContainer: {
		backgroundColor: Colors.primary500,
		paddingVerttical: 8,
		paddingHorizontal: 16,
		elevation: 2,
	},
	button: {
		color: 'white',
		textAlign: 'center',
	},
	pressed: {
		opacity: 0.75,
	},
});
