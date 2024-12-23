import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Status from "./Status";

export default function Container({ containerNumber, status, customer }) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/package.png")} style={styles.img} />
      <View style={styles.detailsContainer}>
        <Text>{customer.name}</Text>
        <Text>{containerNumber}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Status status={status} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // paddingVertical: 24,
    // paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#C0E863",
    flexDirection: "row",
    gap: 16,
    // alignItems: "center",
  },
  detailsContainer: {
    justifyContent: "center",
  },
  statusContainer: {
    padding: 16,
    marginStart: "auto",
    // backgroundColor: "orange",
    justifyContent: "center",
  },
  img: {
    height: 100,
    width: 100,
    backgroundColor: "lightblue",
    borderRadius: 20,
  },
});
