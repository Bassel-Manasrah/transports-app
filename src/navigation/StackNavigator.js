import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import TransportsScreen from "../screens/TransportsScreen";
import ContainersScreen from "../screens/ContainersScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Transports"
        component={TransportsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Containers"
        component={ContainersScreen}
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
}
