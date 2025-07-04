import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Platform,
    Dimensions,
} from 'react-native';
import Svg, { Rect, Circle } from 'react-native-svg';

const SearchBox = ({ placeholder = 'Search...' , style}) => {

    return (
        <View style={[styles.searchBox, style]}>
            <View style={styles.iconWrapper}>
                <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
                    <Rect
                        x="23.7071"
                        y="25.1213"
                        width="2"
                        height="9"
                        transform="rotate(-45 23.7071 25.1213)"
                        fill="#FFD427"
                        stroke="#FFD427"
                    />
                    <Circle
                        cx="18.5"
                        cy="18.5"
                        r="8"
                        fill="white"
                        stroke="#FFD427"
                    />
                </Svg>
            </View>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#D9D9D9"
                style={styles.input}
            />
        </View>
    );
};

export default SearchBox;

const styles = StyleSheet.create({
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 10,
        height: 42,
        paddingHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.10,
        shadowRadius: 3,
        elevation: 3
    },
    iconWrapper: {
        paddingBottom: 8, // lowers the icon
        marginLeft: -2,
        paddingRight: 10
    },
    input: {
        flex: 1,
        fontSize: 20,
        fontFamily: 'CrimsonText-Regular',
        fontWeight: '400',
        color: '#D9D9D9',
    },
    debug: {
        borderColor: 'blue',
        borderStyle: 'solid',
        borderWidth: 1
    }
});
