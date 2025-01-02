import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Transport from "../components/Transport";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CircularBadge from "../components/CircularBadge";
import Chip from "../components/Chip";

const dummy = [
  {
    fromLocation: "a",
    toLocation: "b",
    transportStatus: "PENDING",
    containers: [],
    sendingDate: "2024-12-27",
  },

  {
    fromLocation: "a",
    toLocation: "b",
    transportStatus: "PENDING",
    containers: [],
    sendingDate: "2024-12-25",
  },
  {
    fromLocation: "a",
    toLocation: "b",
    transportStatus: "PENDING",
    containers: [],
    sendingDate: "2024-12-3",
  },
  {
    fromLocation: "a",
    toLocation: "b",
    transportStatus: "PENDING",
    containers: [],
    sendingDate: "2023-12-3",
  },
];

const categorizeTransports = (transports) => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(todayStart);
  todayEnd.setDate(todayStart.getDate() + 1);

  const startOfWeek = new Date(todayStart);
  startOfWeek.setDate(todayStart.getDate() - todayStart.getDay()); // Adjust to Sunday
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const today = transports.filter((transport) => {
    const sendingDate = new Date(transport.sendingDate);
    return sendingDate >= todayStart && sendingDate < todayEnd;
  });

  const thisWeek = transports.filter((transport) => {
    const sendingDate = new Date(transport.sendingDate);
    return sendingDate >= startOfWeek && sendingDate < endOfWeek;
  });

  const thisMonth = transports.filter((transport) => {
    const sendingDate = new Date(transport.sendingDate);
    return sendingDate >= startOfMonth && sendingDate < endOfMonth;
  });

  const all = [...transports];

  return { today, thisWeek, thisMonth, all };
};

export default function TransportsScreen({ route, navigation }) {
  const [transports, setTransports] = useState([]);
  const [todayTransports, setTodayTransports] = useState([]);
  const [weekTransports, setWeekTransports] = useState([]);
  const [monthTransports, setMonthTransports] = useState([]);
  const [allTransports, setAllTransports] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState("all");

  console.log(route.params);

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

    const { today, thisWeek, thisMonth, all } = categorizeTransports(data);

    setTodayTransports(today);
    setWeekTransports(thisWeek);
    setMonthTransports(thisMonth);
    setAllTransports(all);

    setLoading(false);
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContianer}>
        <Text style={styles.title}>Hello</Text>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.filtersContainer}>
          <Chip
            selected={selectedFilter == "today"}
            onPress={() => {
              if (selectedFilter === "today") setSelectedFilter("all");
              else setSelectedFilter("today");
            }}
          >
            <Text>Today ({todayTransports.length})</Text>
          </Chip>
          <Chip
            selected={selectedFilter == "week"}
            onPress={() => {
              if (selectedFilter === "week") setSelectedFilter("all");
              else setSelectedFilter("week");
            }}
          >
            <Text>Week ({weekTransports.length})</Text>
          </Chip>
          <Chip
            selected={selectedFilter == "month"}
            onPress={() => {
              if (selectedFilter === "month") setSelectedFilter("all");
              else setSelectedFilter("month");
            }}
          >
            <Text>Month ({monthTransports.length})</Text>
          </Chip>
        </View>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={
            selectedFilter === "all"
              ? allTransports
              : selectedFilter === "month"
              ? monthTransports
              : selectedFilter === "week"
              ? weekTransports
              : selectedFilter === "today"
              ? todayTransports
              : []
          }
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
                  transportId: item.id,
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
