import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { TouchableRipple } from "react-native-paper";

export default function Chip({ children, selected = false, onPress }) {
  return (
    <TouchableOpacity>
      <View style={[styles.container, selected && styles.selected]}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: "white",
    borderColor: "#C0E863",
    borderWidth: 1,
  },
  selected: {
    backgroundColor: "#C0E863",
  },
});
