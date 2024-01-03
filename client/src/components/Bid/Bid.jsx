import React, { useContext, useEffect, useState } from "react";
import {
  fetchProductById,
  fetchUserById,
  getHighestBidForItem,
} from "../../data/api/fetchingData";
import Notification from "../Notification/Notification";
import { NOTIFICATION_STATES } from "../Notification/notificationStates";
import Product from "../Product/Product";
import "./Bid.css";
import { BidsLoaderContext } from "../../context/Bids/BidsLoadingContext";
import { useLocation } from "react-router-dom";
import PlaceBidForm from "./PlaceBidForm/PlaceBidForm";
import WinnerDetails from "./WinnerDetails/WinnerDetails";
import { RiAuctionLine } from "react-icons/ri";
import ProductDetails from "../Product/ProductDetails/ProductDetails";

const Bid = ({ bidData }) => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const { id, bidderId, productId, min_bid, created_at, end_time } = bidData;
  const { loaderData } = useContext(BidsLoaderContext);
  const [isLoading, setIsLoading] = loaderData;

  const [showPlaceBidForm, setShowPlaceBidForm] = useState(false);

  const [highestBid, setHighestBid] = useState(+min_bid);

  const [winnerData, setWinnerData] = useState({ username: "" });

  const [bidderCreatorData, setBidderCreatorData] = useState({});

  const [productData, setProductData] = useState({});

  const [showProductDetails, setShowProductDetails] = useState(false);

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

  const fetchUser = async () => {
    const response = await fetchUserById(bidderId);
    if (response.success) {
      setBidderCreatorData(response.user);
      await getHighestBid();
      setIsLoading((prevState) => {
        return { ...prevState, bidLoaded: true };
      });
    } else {
      updateNotification(response.message, NOTIFICATION_STATES.INFO);
    }
  };

  const getHighestBid = async () => {
    const response = await getHighestBidForItem(id);
    if (response.success) {
      setHighestBid(+response.highestBid);
      await fetchWinnerData(response.userId);
    } else setWinnerData({ ...winnerData, username: "none" });
  };

  const fetchWinnerData = async (winnerId) => {
    const response = await fetchUserById(winnerId);
    if (response.success) {
      setWinnerData(response.user);
    } else {
      updateNotification(response.message, NOTIFICATION_STATES.INFO);
    }
  };

  const fetchProduct = async () => {
    if (currentLocation !== "/bids")
      updateNotification("Loading", NOTIFICATION_STATES.LOAD);

    const response = await fetchProductById(productId);
    if (response.success) {
      setProductData(response.product);
      if (currentLocation === "/bids" || currentLocation === "/myAccount/bids")
        setIsLoading((prevState) => {
          return { ...prevState, productLoaded: true };
        });

      if (currentLocation !== "/bids") setShowNotification(false);
    } else {
      updateNotification(response.message, NOTIFICATION_STATES.INFO);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProduct();
  }, []);

  return (
    <>
      {showNotification && (
        <Notification
          message={notificationData.message}
          state={notificationData.state}
          onDismiss={handleDismiss}
        />
      )}
      {showProductDetails && (
        <ProductDetails
          setShowDetails={setShowProductDetails}
          product={productData}
        />
      )}

      <div className="bid-container">
        <div className="ends_time-container">
          <p>
            ends at(Y-M-D): <span>{end_time}</span>
          </p>
        </div>
        <div className="card">
          <div className="card-img">
            <img
              onClick={() => setShowProductDetails(true)}
              title="View Product details"
              src={productData.image}
              alt=""
            />
          </div>
          <div className="card-info">
            <p className="text-title">
              Created by: {bidderCreatorData.username}{" "}
            </p>
            <p className="text-body">Winner Id: {winnerData.id}</p>
          </div>
          <div className="card-footer"></div>
          <WinnerDetails
            bidAmount={highestBid}
            username={winnerData.username}
            id={winnerData.id}
          />
          <div className="bid_button-container">
            {location.pathname !== "/myAccount/bids" ? (
              <button
                onClick={() => setShowPlaceBidForm(true)}
                className="card-button"
              >
                <RiAuctionLine />
              </button>
            ) : (
              <button className="secondary-button">Delete Bid</button>
            )}
          </div>
        </div>
        {/* <h3 className="bid-id">Bid ID: {id}</h3>
        <h2 className="bid-creator">
          Created By: {bidderCreatorData.username}{" "}
        </h2>
        <h3 className="bid-created-at">
          <span>created at: {created_at}</span>
        </h3>
        <h3 className="bid-end-time">ends in: {end_time}</h3> */}
        {/* <h4 className="bid-min-bid">min bid required ${highestBid}</h4>
        <h4 className="bid-min-bid">current winner: {winnerData.username}</h4>
        <h4 className="bid-min-bid">current winner id: {winnerData.id}</h4> */}

        {/* <Product
          showBtns={showBtns}
          setShowBtns={setShowBtns}
          productId={productId}
        /> */}
      </div>

      {showPlaceBidForm && (
        <PlaceBidForm
          setWinnerData={setWinnerData}
          bidId={id}
          highestBid={highestBid}
          setHighestBid={setHighestBid}
          setShowPlaceBidForm={setShowPlaceBidForm}
          updateNotification={updateNotification}
        />
      )}
    </>
  );
};

export default Bid;
