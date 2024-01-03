import "./Notification.css";
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { NOTIFICATION_STATES } from "./notificationStates";
import { useEffect } from "react";

const Notification = ({ message, state, onDismiss }) => {
  useEffect(() => {
    if (state !== NOTIFICATION_STATES.LOAD) {
      const timeoutId = setTimeout(() => {
        onDismiss();
      }, 3000); // Dismiss the notification after 3 seconds (adjust as needed)

      return () => clearTimeout(timeoutId);
    }
    // }, [state, onDismiss]);
  }, [state]);

  // Define classes based on the state prop
  let notificationClass = "notification_container"; // Default class
  let icon = null; // Default icon

  if (state === NOTIFICATION_STATES.WARN) {
    notificationClass += " warn";
    icon = <FaExclamationCircle />;
  } else if (state === NOTIFICATION_STATES.LOAD) {
    // notificationClass += " load notification_overlay";
    notificationClass = "load notification_overlay";
    icon = <div className="loader"></div>;
  } else if (state === NOTIFICATION_STATES.SUCCESS) {
    notificationClass += " success";
    icon = <FaCheckCircle />;
  } else if (state === NOTIFICATION_STATES.ERROR) {
    notificationClass += " error";
    icon = <FaTimesCircle />;
  } else if (state === NOTIFICATION_STATES.INFO) {
    notificationClass += " info";
    icon = <FaInfoCircle />;
  }

  return (
    <div className={notificationClass}>
      <div className="notification_icon">{icon}</div>
      <div className="notification_message">{message}</div>
    </div>
  );
};

export default Notification;
