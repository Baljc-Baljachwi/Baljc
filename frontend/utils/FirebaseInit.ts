import firebase from "firebase";
import { toast } from "react-toastify";

export async function getToken() {
  if (firebase.messaging.isSupported() === false) {
    console.log("isSupported: ", firebase.messaging.isSupported());
    return null;
  }

  const messaging = firebase.messaging();

  try {
    const currentToken = await messaging.getToken({
      vapidKey:
        "BEUtZMXn0EyfJMLSF7j979ocXCzI7Ft4PvIgmQHHMI0g3eH0_nb1zHQY5AUK4PcUSLAKSaDEJJcx66xiWVaZjsw",
    });

    await messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      console.log(payload.notification);

      toast("⏰ " + payload.notification.body, {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 2000,
        bodyStyle: {
          color: "black",
          fontSize: "1.4rem",
          fontWeight: "bold",
        },
      });
    });

    if (currentToken) {
      console.log(currentToken);
      return currentToken;
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
      return "";
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
