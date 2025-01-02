import React from "react";
import { SafeAreaView, StyleSheet, Button, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";

export default function Test() {
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // Limit to PDF files
        copyToCacheDirectory: true, // Optionally cache the file
      });

      if (!result.canceled) {
        const file = result.assets[0];
        console.log("File URI:", file.uri); // Handle the selected file
        Alert.alert("Document Selected", `File name: ${file.name}`);
      } else {
        console.log("User cancelled document picker");
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Unable to pick document. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Upload PDF" onPress={pickDocument} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
