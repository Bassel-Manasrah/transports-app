import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import UploadImage from "../components/UploadImage";
import Gallery from "../components/Gallery";
import { db } from "../../FirebaseConfig";
import { getStorage, ref } from "firebase/storage";
import { uploadImageForContainer } from "../utils/containerUtils";
import Dropdown from "../components/Dropdown";
// import GridImageView from "react-native-grid-image-viewer";
// import Gallery from "react-native-awesome-gallery";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

export default function ContainerDetailsScreen({}) {
  const containerNumber = "SUDU8642500";
  const transportNumber = "11";

  img_urls = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/ChessSet.jpg/640px-ChessSet.jpg",
    "https://www.lego.com/cdn/cs/set/assets/blt68fab4c5d3f1fb7a/21246_alt1.png?fit=crop&quality=80&width=400&height=400&dpr=1",
  ];

  const [images, setImages] = useState([]);

  const onUpload = (newImages) => {
    // upload new images to firebase storage
    newImages.forEach((image) => {
      uploadImageForContainer(image, transportNumber, containerNumber);
    });

    // update ui state
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const onImageLongPress = () => {
    console.log("long press");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Ionicons
          name="arrow-back"
          color="white"
          size={24}
          onPress={() => {
            navigation.goBack();
          }}
        ></Ionicons>
        <Text style={styles.title}>Container Details</Text>
      </View>
      <View style={styles.bodyContainer}>
        <UploadImage onUpload={onUpload} />
        <Gallery images={images} onLongPress={onImageLongPress} />
      </View>
      <Dropdown data={data} />

      <StatusBar backgroundColor="#162534" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "lightblue",
    // padding: 16,
    gap: 16,
    flex: 1,
  },
  titleContainer: {
    width: "100%",
    backgroundColor: "#162534",
    padding: 24,
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  bodyContainer: {
    padding: 24,
    gap: 8,
  },

  title: {
    color: "white",
    fontSize: 18,
  },
});
