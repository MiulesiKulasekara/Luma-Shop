import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "../../../config/firebaseConfig";

const messaging = getMessaging(app);

// Function to request permission and get the FCM token
export const requestForToken = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "FILL_CORRECT_DETAILS",
    });
    if (currentToken) {
      document.cookie = `FCM_TOKEN=${currentToken}; path=/; max-age=31536000; Secure; SameSite=Strict`;
    }
  }
};
