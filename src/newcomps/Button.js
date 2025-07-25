//meep

import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';

/**
 * @param children - whatever you put inside button will render, recommended to use text
 * @param color - optional, defaults to yellow if none
 * @param style - optional styling for the button if you want to overwrite button defaults
 * @param onPress - function for what to do when button is pressed, button is touchable opacity.
 */
export default Button = ({ children, style, textStyle, color, icon, onPress }) => {

    let buttonColorStyle = styles.yellow;
    let lableStyle = styles.label;

    if (color == 'green') {
        buttonColorStyle = styles.green;
        lableStyle = styles.greenLabel;
    }
    else if (color == 'red') {
        buttonColorStyle = styles.red;
    }
    else if (color == 'error') {
        buttonColorStyle = styles.error;
        lableStyle = styles.errorLabel;
    }

    //if button has no function
    if (!onPress){
        onPress = () => {}
    }

    return (
        <TouchableOpacity style={[styles.button, buttonColorStyle, style]} onPress={() => onPress()}>
            {icon} 
            <Text style={[styles.label, lableStyle, textStyle]}> {children} </Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    label: {
        color: 'black',
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
        elevation: 4,
        flexDirection: 'row'
    },
    yellow: {
        backgroundColor: '#FFD427'
    },
    green: {
        backgroundColor: '#11460D'
    },
    greenLabel: {
        color: '#FFF4E2'
    },
    red: {
        backgroundColor: '#DF0000'
    },
    error: {
        borderColor: '#ffb3b3',
        borderStyle: 'solid',
        borderWidth: 1,
        backgroundColor: '#FFDBDB',
        paddingVertical: 4,
        paddingHorizontal: 6
    },
    errorLabel: {
        color: '#FF3D3D',
        fontSize: 14,
    }
})