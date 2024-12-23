import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Status({
  // pending = true,
  // delivered = false,
  // inTransit = false,
  status,
}) {
  let textColor, bgColor, text;

  if (status === "DELIVERED") {
    text = "Delivered";
    textColor = "#92CE51";
    bgColor = "#E8F7DA";
  } else if (status === "IN_TRANSIT") {
    text = "In Transit";
    textColor = "#E9C85E";
    bgColor = "#FFF8DE";
  } else {
    text = "Pending";
    textColor = "#FC6263";
    bgColor = "#ffd9d9";
  }

  const containerStyle = [styles.container, { backgroundColor: bgColor }];
  const textStyle = [styles.text, { color: textColor }];

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    padding: 8,
    // backgroundColor: "#ffd9d9",
    borderRadius: 20,
  },
  text: {
    // color: "#FC6263",
    fontWeight: "bold",
    textAlign: "center",
  },
});
