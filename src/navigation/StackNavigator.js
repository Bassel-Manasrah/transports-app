import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import TransportsScreen from "../screens/TransportsScreen";
import ContainersScreen from "../screens/ContainersScreen";
import ContainerDetailsScreen from "../screens/ContainerDetailsScreen";
import CreateRecipientScreen from "../screens/CreateRecipientScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePreviewScreen from "../screens/ImagePreviewScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const [driverId, setDriverId] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const id = await AsyncStorage.getItem("driverId");
        console.log(`driverId: ${id}`);

        if (id) {
          setDriverId(id);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setSignedIn(false); // Default to Login screen on error
      }
    };

    checkLoginStatus();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("driverId");
    setDriverId(null);
  };

  return (
    <Stack.Navigator>
      {driverId ? (
        <>
          <Stack.Screen
            name="Transports"
            component={TransportsScreen}
            options={{ headerShown: false }}
            initialParams={{ driver: { id: driverId }, logout }}
          />
          <Stack.Screen
            name="Containers"
            component={ContainersScreen}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="ContainerDetails"
            component={ContainerDetailsScreen}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="ImagePreview"
            component={ImagePreviewScreen}
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="CreateRecipient"
            component={CreateRecipientScreen}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
          initialParams={{ setDriverId }}
        />
      )}
    </Stack.Navigator>
  );
}
