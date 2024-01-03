export const NOTIFICATION_STATES = {
  WARN: "warn",
  LOAD: "load",
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
};

// import { NOTIFICATION_STATES } from "../../components/Notification/notificationStates";

// const [showNotification, setShowNotification] = useState(false);
// const [notificationData, setNotificationData] = useState({
//   state: "",
//   message: "",
// });

// const handleDismiss = () => {
//   setShowNotification(false);
//   setNotificationData({
//     state: "",
//     message: "",
//   });
// };

// const updateNotification = (message, state) => {
//   setNotificationData({
//     ...notificationData,
//     message: message,
//     state: state,
//   });
// setShowNotification(true);
// };

// {
//   showNotification && (
//     <Notification
//       message={notificationData.message}
//       state={notificationData.state}
//       onDismiss={handleDismiss}
//     />
//   )
// }
