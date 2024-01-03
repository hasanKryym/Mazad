import { useContext, useEffect, useState } from "react";
import "./ProductDetails.css";
import { NOTIFICATION_STATES } from "../../Notification/notificationStates";
import Notification from "../../Notification/Notification";
import { BidsLoaderContext } from "../../../context/Bids/BidsLoadingContext";
import { useLocation, Link } from "react-router-dom";

const ProductDetails = ({ product, setShowDetails }) => {
  const { id, name, image, description } = product;

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

      <div className="card product-details">
        <div className="card-img">
          <img title="View Product" src={image} alt="" />
        </div>
        <div className="card-info">
          <p className="text-title">{name} </p>
          <p className={`text-body full-text`}>{description}</p>
        </div>
        <div className="card-footer"></div>
        <button onClick={() => setShowDetails(false)} className="close-button">
          Close
        </button>
      </div>
    </>
  );
};

export default ProductDetails;
