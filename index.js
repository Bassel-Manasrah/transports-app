import { registerRootComponent } from "expo";

import App from "./App";
import TransportsScreen from "./src/screens/TransportsScreen";
import ContainersScreen from "./src/screens/ContainersScreen";
import ContainerDetailsScreen from "./src/screens/ContainerDetailsScreen";
import CreateRecipientScreen from "./src/screens/CreateRecipientScreen";
import Test from "./src/screens/Test";
import messaging from "@react-native-firebase/messaging";
import notifee from "@notifee/react-native";
import * as Notifications from "expo-notifications";

async function requestPermissions() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== "granted") {
      alert("Permission to send notifications is required!");
    }
  }
}

// Schedule a notification
async function pushNotification({ title, body }) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: { seconds: 0 }, // Trigger after 5 seconds
  });
}

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("received notification:", remoteMessage);

  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== "granted") {
      alert("Permission to send notifications is required!");
    }
  } else {
    await pushNotification(remoteMessage.data);
  }
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

// registerRootComponent(Test);

registerRootComponent(App);
// registerRootComponent(CreateRecipientScreen);
// registerRootComponent(CreateRecipientScreen);

// registerRootComponent(Test);
