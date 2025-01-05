import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { StatusBar } from "expo-status-bar";
import { saveValue } from "../services/StoreService";
import {
  registerForPushNotificationsAsync,
  requestNotificationPermissions,
} from "../services/notificationService";

export default function LoginScreen({ route, navigation }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { setDriverId } = route.params;

  const onPress = async () => {
    const apiUrl =
      "https://kareem-transportation.online/api/users/driver/login";

    // const requestBody = { userName, password };

    const requestBody = {
      userName: "driver@gmail.com",
      password: "1234",
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      Alert.alert(
        "Login Failed",
        "You have entered a wrong username or password"
      );
      return;
    }
    const responseData = await response.json();
    console.log("Login successful, driver: ", responseData);

    const token = await registerForPushNotificationsAsync(responseData.id);

    requestNotificationPermissions();

    //TODO: uncomment
    await saveValue("driverId", `${responseData.id}`);
    setDriverId(responseData.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContianer}>
        <Text style={styles.title}>Sign in to your Account</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          label="Username"
          value={userName}
          onChangeText={(text) => setUserName(text)}
          mode="outlined"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          mode="outlined"
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={onPress}>Login</Button>
      </View>
      <StatusBar backgroundColor="#162534" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  titleContianer: {
    backgroundColor: "#162534",
    padding: 24,
    height: "30%",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 36,
  },
  formContainer: {
    padding: 16,
    gap: 16,
  },
  buttonContainer: {
    marginTop: "auto",
    padding: 16,
  },
});
