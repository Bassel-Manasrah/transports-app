import { View, Text, StyleSheet } from "react-native";
import React from "react";

const CircularBadge = ({
  number,
  size = 24,
  color = "#C0E863",
  textColor = "black",
}) => {
  return (
    <View
      style={[
        styles.badge,
        { width: size, height: size, backgroundColor: color },
      ]}
    >
      <Text style={[styles.badgeText, { color: textColor }]}>{number}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    margin: 5,
  },
  badgeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CircularBadge;
