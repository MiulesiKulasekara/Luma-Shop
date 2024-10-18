import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "../../../config/firebaseConfig";

const messaging = getMessaging(app);

// Function to request permission and get the FCM token
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: 'BNMBYd92VFKDW_0t2xN4KWOOigoI191mdOim3WMsgAdmLHMYpvKMt03OhOrxur8ao31E9-ZmeFgQiYKvqxxOvCU' });
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      // Send this token to your server
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
};

// Function to handle incoming messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});