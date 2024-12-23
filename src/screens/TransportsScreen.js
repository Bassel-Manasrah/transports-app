import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Transport from "../components/Transport";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CircularBadge from "../components/CircularBadge";
import Chip from "../components/Chip";

export default function TransportsScreen({ route, navigation }) {
  const [transports, setTransports] = useState([]);

  // Access the passed parameters
  const { driver } = route.params;

  console.log(driver);

  const containers = [
    {
      containerNumber: "w2345",
      status: "IN_TRANSIT",
      customer: {
        name: "Hamezaveh",
      },
    },
    {
      containerNumber: "w2345",
      status: "IN_TRANSIT",
      customer: {
        name: "Hamezaveh",
      },
    },
    {
      containerNumber: "w2345",
      status: "IN_TRANSIT",
      customer: {
        name: "Hamezaveh",
      },
    },
  ];

  const fetchTransports = async () => {
    const { id } = driver;

    const apiUrl = `https://kareem-transportation.online/api/transports/driverTransports/${id}`;

    const response = await fetch(apiUrl);

    console.log(response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setTransports(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContianer}>
        <Text style={styles.title}>Hello Bassel</Text>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.filtersContainer}>
          <Chip selected>
            <Text>Today (3)</Text>
          </Chip>
          <Chip>
            <Text>Week (14)</Text>
          </Chip>
          <Chip>
            <Text>Month (54)</Text>
          </Chip>
        </View>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={transports}
          renderItem={({ item }) => (
            <Transport
              from={item.fromLocation}
              to={item.toLocation}
              containersCount={item.containers.length}
              status={item.transportStatus}
              date={item.sendingDate}
              containers={item.containers}
              onPress={() => {
                navigation.navigate("Containers", {
                  containers: item.containers,
                });
              }}
            />
          )}
        />
      </View>

      <StatusBar style="light" backgroundColor="#162534" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContianer: {
    width: "100%",
    backgroundColor: "#162534",
    padding: 24,
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  filtersContainer: {
    // padding: 16,
    // backgroundColor: "lightblue",
    flexDirection: "row",
    gap: 8,
  },
  title: {
    color: "white",
    fontSize: 18,
  },
  listContainer: {
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    // backgroundColor: "yellow",
  },
  flatListContainer: {
    gap: 8,
  },
});
