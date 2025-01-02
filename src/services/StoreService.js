import AsyncStorage from "@react-native-async-storage/async-storage";

// Save value to shared prefs
const saveValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Success", "Value saved successfully!");
  } catch (error) {
    console.error("Error saving value:", error);
  }
};

// Retrieve value from shared prefs
const getValue = async (key) => {
  try {
    const savedValue = await AsyncStorage.getItem(key);
    if (savedValue !== null) {
      Alert.alert("Value Retrieved", `Key: ${key}, Value: ${savedValue}`);
    } else {
      Alert.alert("No Value Found", "No value exists for the provided key.");
    }
  } catch (error) {
    Alert.alert("Error", "Failed to retrieve the value.");
    console.error("Error retrieving value:", error);
  }
};

export { saveValue, getValue };
