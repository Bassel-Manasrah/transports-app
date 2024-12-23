import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import Status from "./Status";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Transport({
  from,
  to,
  containersCount,
  status,
  date,
  containers,
  onPress = () => {},
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.destinationContainer}>
          <Text style={styles.subtext}>Destination</Text>

          {/* From Section */}
          <View style={styles.row}>
            <View style={styles.fromDot} />
            <Text>{from}</Text>
          </View>

          {/* Dashed Line */}
          <View style={styles.dashedLine} />

          {/* To Section */}
          <View style={styles.row}>
            <View style={styles.toDot} />
            <Text>{to}</Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{date}</Text>
          <View style={{ padding: 12 }}></View>
        </View>
        <View style={styles.statusContainer}>
          <Status status={status} />
          <FlatList
            // contentContainerStyle={styles.listContainer}
            data={containers}
            renderItem={({ item }) => (
              <View style={[styles.row, { gap: 4 }]}>
                <Ionicons name="cube-outline" size={16}></Ionicons>
                <Text>{item.containerNumber}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 20,
    // borderColor: "#d2e1fc",
    borderColor: "#C0E863",
    flexDirection: "row",
    gap: 12,
  },
  dateContainer: {
    // backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    // backgroundColor: "brown",
    textAlign: "center",
  },
  timeContainer: {
    backgroundColor: "#162534",
    padding: 8,
  },
  statusContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  destinationContainer: {
    // backgroundColor: "lightblue",
    flex: 1,
  },

  row: {
    flexDirection: "row",
    // backgroundColor: "brown",
    alignItems: "center",
  },
  fromDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3531C6",
    marginRight: 10,
  },
  toDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    // borderWidth: 2,
    backgroundColor: "#FD58A4",
    marginRight: 10,
  },
  subtext: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007bff",
    marginRight: 10,
  },
  dashedLine: {
    width: 0,
    borderWidth: 1,
    borderColor: "#3531C6",
    height: 10,
    marginLeft: 4.5,
    borderStyle: "dashed",
  },
});
