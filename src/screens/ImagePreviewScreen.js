import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ImagePreviewScreen({ route, navigation }) {
  const { uri } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="arrow-back-outline"
          size={32}
          color="white"
          style={styles.goBackIcon}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View
        style={{
          //   backgroundColor: "lightblue",
          position: "absolute",
          top: 100,
          bottom: 100,
          right: 0,
          left: 0,
        }}
      >
        <Image src={uri} style={styles.img} />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.closeContainer}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          Close
        </Text>
      </TouchableOpacity>
      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    flexDirection: "column",
  },
  img: {
    objectFit: "contain",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  iconContainer: {
    zIndex: 10,
    justifyContent: "flex-start",
    padding: 16,
    alignItems: "flex-start",
  },
  closeContainer: {
    zIndex: 10,
    marginTop: "auto",
    padding: 32,
  },
});
