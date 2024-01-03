import { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Bids from "../../../pages/Bids/Bids";
import AccountNavbar from "../AccountNavbar/AccountNavbar";
import AddNewBidForm from "../../../components/Bid/AddNewBidForm/AddNewBidForm";
import Notification from "../../../components/Notification/Notification";
import { NOTIFICATION_STATES } from "../../../components/Notification/notificationStates";
const UserBids = () => {
  const [showAddNewBidForm, setAddNewBidForm] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    state: "",
    message: "",
  });

  const handleDismiss = () => {
    setShowNotification(false);
    setNotificationData({
      state: "",
      message: "",
    });
  };

  const updateNotification = (message, state) => {
    setNotificationData({
      ...notificationData,
      message: message,
      state: state,
    });
    setShowNotification(true);
  };
  return (
    <>
      {showNotification && (
        <Notification
          message={notificationData.message}
          state={notificationData.state}
          onDismiss={handleDismiss}
        />
      )}
      <Navbar />
      <AccountNavbar />
      <div className="center-div">
        <button
          className="classic-button"
          onClick={() => setAddNewBidForm(true)}
        >
          Add new Bid
        </button>
      </div>
      {showAddNewBidForm && (
        <AddNewBidForm
          setAddNewBidForm={setAddNewBidForm}
          updateNotification={updateNotification}
        />
      )}
      <Bids />
    </>
  );
};

export default UserBids;
