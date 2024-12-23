import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

export default function UploadImage({ onUpload }) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      onUpload(uris);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <View style={styles.container}>
        <Ionicons name="cloud-upload-outline" size={24} />
        <Text style={styles.title}>Upload Image</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 2,
    padding: 32,
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
