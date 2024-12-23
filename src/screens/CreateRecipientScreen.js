import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, TextInput } from "react-native-paper";
import Button from "../components/Button";
import { StatusBar } from "expo-status-bar";

export default function CreateRecipientScreen() {
  const [companyName, setCompanyName] = useState("a");
  const [companyAddress, setCompanyAddress] = useState("a");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("a");
  const [driverName, setDriverName] = useState("a");
  const [driverPhoneNumber, setDriverPhoneNumber] = useState("a");
  const [truckNumber, setTruckNumber] = useState("a");
  const [sign, setSign] = useState("a");
  const [comments, setComments] = useState("a");

  const [createButtonPressed, setCreateButtonPressed] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const onPress = async () => {
    const recepient = {
      companyName,
      companyAddress,
      companyPhoneNumber,
      driverName,
      driverPhoneNumber,
      truckNumber,
      sign,
      comments,
    };

    const hasEmptyFields = Object.values(recepient).some(
      (value) => value === ""
    );

    if (hasEmptyFields) {
      console.log("All fields must be filled out!");
      setShowErrorMessage(true);
    } else {
      const url = "https://kareem-transportation.online/api/recipients";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recepient),
      });

      console.log(response);

      console.log(recepient);
      setLoading(true);
    }
    setCreateButtonPressed(true);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#C0E863" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Create Recipient</Text>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <TextInput
          label="Company Name"
          value={companyName}
          onChangeText={(text) => setCompanyName(text)}
          mode="outlined"
          error={createButtonPressed && companyName === ""}
        />
        <TextInput
          label="Company Address"
          value={companyAddress}
          onChangeText={(text) => setCompanyAddress(text)}
          mode="outlined"
          error={createButtonPressed && companyAddress === ""}
        />
        <TextInput
          label="Company Phone Number"
          value={companyPhoneNumber}
          onChangeText={(text) => setCompanyPhoneNumber(text)}
          mode="outlined"
          keyboardType="numeric"
          error={createButtonPressed && companyPhoneNumber === ""}
        />
        <TextInput
          label="Driver Name"
          value={driverName}
          onChangeText={(text) => setDriverName(text)}
          mode="outlined"
          error={createButtonPressed && driverName === ""}
        />
        <TextInput
          label="Driver Phone Number"
          value={driverPhoneNumber}
          onChangeText={(text) => setDriverPhoneNumber(text)}
          mode="outlined"
          keyboardType="numeric"
          error={createButtonPressed && driverPhoneNumber === ""}
        />
        <TextInput
          label="Truck Number"
          value={truckNumber}
          onChangeText={(text) => setTruckNumber(text)}
          mode="outlined"
          keyboardType="numeric"
          error={createButtonPressed && truckNumber === ""}
        />
        <TextInput
          label="Sign"
          value={sign}
          onChangeText={(text) => setSign(text)}
          mode="outlined"
          error={createButtonPressed && sign === ""}
        />
        <TextInput
          label="Comments"
          value={comments}
          onChangeText={(text) => setComments(text)}
          mode="outlined"
          error={createButtonPressed && comments === ""}
          multiline
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button onPress={onPress}>Create</Button>
        {showErrorMessage && (
          <Text style={styles.errorMessage}>Please fill all fields</Text>
        )}
      </View>
      <StatusBar backgroundColor="#162534" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    backgroundColor: "#162534",
    padding: 24,
  },
  title: {
    color: "white",
    fontSize: 18,
  },

  errorMessage: {
    color: "#cc0000",
    fontWeight: "bold",
    textAlign: "center",
  },

  formContainer: {
    padding: 16,
    gap: 8,
  },
  buttonContainer: {
    marginTop: "auto",
    padding: 16,
    gap: 4,
  },
});
