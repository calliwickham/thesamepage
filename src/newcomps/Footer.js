import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HomeIcon from './HomeIcon';
import AlbumIcon from './AlbumIcon';
import FriendsIcon from './FriendsIcon';
import SettingsIcon from './SettingsIcon';

const Footer = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('OnlineHomepage')}>
                <HomeIcon width={36} height={34} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Albums')}>
                <AlbumIcon width={41} height={36} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MyFriends')}>
                <FriendsIcon width={41} height={42} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('OnlineSettingsPage')}>
                <SettingsIcon width={39} height={39} />
            </TouchableOpacity>
        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 85,
        backgroundColor: '#073902',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 40,
        paddingTop: 18,
    },
});
