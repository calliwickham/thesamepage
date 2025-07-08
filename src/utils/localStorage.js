import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeLocal(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Error saving to local storage:', e);
  }
}

export async function getLocal(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error('Error reading from local storage:', e);
    return null;
  }
}

export async function removeLocal(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing from local storage:', e);
  }
}
