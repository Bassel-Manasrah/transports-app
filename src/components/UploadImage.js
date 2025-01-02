import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

export default function UploadImage({ onUpload }) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [1, 1],
      quality: 1,
      // allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri; // Pick the first selected image's URI
      onUpload(uri); // Send the single image URI to the onUpload function
    }
  };

  const pickPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // Limit to PDF files
        copyToCacheDirectory: true, // Optionally cache the file
      });

      if (!result.canceled) {
        const file = result.assets[0];
        console.log("File URI:", file.uri); // Handle the selected file
        onUpload(file.uri);
      } else {
        console.log("User cancelled document picker");
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Unable to pick document. Please try again.");
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.container}>
          <Ionicons name="image-outline" size={24} />
          <Text style={styles.title}>Upload Image</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={pickPDF}>
        <View style={styles.container}>
          <Ionicons name="document-outline" size={24} />
          <Text style={styles.title}>Upload PDF</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 2,
    padding: 16,
    borderStyle: "dashed",
    backgroundColor: "#C0E863",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  title: {
    // backgroundColor: "purple",
    fontWeight: "bold",
    textAlign: "center",
  },
});
