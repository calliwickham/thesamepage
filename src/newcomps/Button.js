//meep

import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';

/**
 * @param children - whatever you put inside button will render, recommended to use text
 * @param color - optional, defaults to yellow if none
 * @param style - optional styling for the button if you want to overwrite button defaults
 * @param onPress - function for what to do when button is pressed, button is touchable opacity.
 */
export default Button = ({ children, style, color, onPress }) => {

    const buttonColorStyle = styles.yellow;

    if (color == 'green') {
        buttonColorStyle = styles.green;
    }
    else if (color == 'red') {
        buttonColorStyle = styles.red;
    }

    return (
        <TouchableOpacity style={[styles.button, buttonColorStyle, style]} onPress={() => onPress()}>
            <Text style={styles.label}> {children} </Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    label: {
        color: '#000',
        textAlign: 'center',
        fontFamily: 'CrimsonText-SemiBold',
        fontSize: 16,
        fontWeight: '600',
        fontStyle: 'normal',
    },
    button: {
        borderRadius: 50,
        shadowColor: '#000',
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 4
    },
    yellow: {
        backgroundColor: '#FFD427'
    },
    green: {
        backgroundColor: '#11460D'
    },
    red: {
        backgroundColor: '#FF0000'
    },
    error: {
        backgroundColor: '#FFDBDB',
        color: 'FF3D3D'
    }
})