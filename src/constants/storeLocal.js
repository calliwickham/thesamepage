import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLocal = async (key, value) => {
    try {
        //console.log('Attempting to save ' + key + ": " + value + ' to local storage.')
        await AsyncStorage.setItem(key, value);
        //console.log('Saved ' + key + ": " + value + ' to local storage.')
    } catch (error) {
        console.log('Error saving ' + key + ": " + value)
    }
}

export const clearLocal = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        //console.log(key + ' cleared from local storage.');
    } catch (error) {
        console.log('Error clearing ' + key + ' from local storage', error);
    }
};