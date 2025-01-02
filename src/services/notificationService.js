import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";
import axios from "axios";

async function registerForPushNotificationsAsync(driverId) {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    handleRegistrationError(
      "Permission not granted to get push token for push notification!"
    );
    return;
  }

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;
  if (!projectId) {
    handleRegistrationError("Project ID not found");
  }
  try {
    let pushTokenString = await Notifications.getExpoPushTokenAsync({
      projectId,
    });

    pushTokenString = pushTokenString.data;
    console.log(pushTokenString);

    updateFcmToken(driverId, pushTokenString);

    return pushTokenString;
  } catch (e) {
    handleRegistrationError(`${e}`);
  }
}

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

const updateFcmToken = async (id, fcmToken) => {
  try {
    const url = `https://kareem-transportation.online/api/driver/${id}/fcm-token`; // Replace with your base URL if needed
    const data = { fcmToken }; // Construct the body with the FCM token

    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json", // Ensure the server knows you're sending JSON
      },
    });

    console.log(response.status);

    console.log("FCM token updated successfully:", response.data);
  } catch (error) {
    console.error(
      "Error updating FCM token:",
      error.response?.data || error.message
    );
  }
};

export { registerForPushNotificationsAsync };
