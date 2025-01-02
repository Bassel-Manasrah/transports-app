import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import Container from "../components/Container";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ContainersScreen({ route, navigation }) {
  // Access the passed parameters
  const { containers, transportId } = route.params;

  const onPressOnContainer = (container) => {
    navigation.navigate("ContainerDetails", { ...container, transportId });
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
        <Text style={styles.title}>Containers</Text>
      </View>
      <View style={[styles.row, { gap: 4, justifyContent: "center" }]}>
        <Ionicons name="cube-outline" size={20}></Ionicons>
        <Text>{containers.length}</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={containers}
        renderItem={({ item }) => (
          <Container {...item} onPress={() => onPressOnContainer(item)} />
        )}
      />
      <StatusBar backgroundColor="#162534" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "pink",
    // padding: 16,
    gap: 16,
    flex: 1,
  },
  listContainer: {
    padding: 16,
    gap: 16,
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

  title: {
    color: "white",
    fontSize: 18,
  },

  row: {
    flexDirection: "row",
    // backgroundColor: "brown",
    alignItems: "center",
  },
});
