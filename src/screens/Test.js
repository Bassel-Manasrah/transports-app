import { View, Text } from "react-native";
import React from "react";
import UploadImage from "../components/UploadImage";
import { ref, uploadBytes } from "firebase/storage";
import * as FileSystem from "expo-file-system";
import { decode as atob } from "base-64";
import { storage } from "../../FirebaseConfig";

export default function Test() {
  const onUpload = async (uris) => {
    console.log("onUpload");

    const uri = uris[0];
    console.log(uri);

    const imageRef = ref(storage, "uploads/containers/" + "1");

    const fetchResponse = await fetch(uri);
    const blob = fetchResponse.blob();

    await uploadBytes(imageRef, blob);

    console.log(`Uploaded ${uris.length} images`);
  };

  return (
    <View style={{ padding: 64 }}>
      <UploadImage onUpload={onUpload} />
    </View>
  );
}
